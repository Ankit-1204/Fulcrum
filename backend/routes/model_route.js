const express=require('express')
const multer =require('multer');
const fs = require('fs');
const path = require('path');
const axios=require('axios')
const authenticate =require('../middleware/auth');
const Model=require('../model/file_model')
const { execFile  } = require('child_process');
const { model } = require('mongoose');

const router=express.Router()

async function runInference(model_name,data,data_type){
    const record= await Model.findOne({'model':model_name})
    console.log(record)
    const envPath=path.resolve(record.venvPath,'Scripts','python')
    const scriptPath = record.script;
    execFile(envPath, [scriptPath, JSON.stringify(data)], (err, stdout, stderr) => {
        if (err) {
            console.error('Error executing Python script:', err);
            return res.status(500).json({ error: 'Failed to process request' });
        }
        if (stderr) {
            console.error('stderr:', stderr);
            return res.status(500).json({ error: 'Python script error' });
        }
        res.json({ result: stdout });
    })
}
async function envSetup(recordId) {
    const record=await Model.findOne({_id:recordId})
    const venvPath = path.join( 'venvs', recordId.toString());
    const req_path = path.resolve(record.requirement);
    console.log(req_path)
    console.log('yooo')
    exec(`python -m venv ${venvPath}`, (err) => {
        if (err) return console.error('Error creating virtual environment:', err);
        const pipInstall = `${path.join(venvPath, 'Scripts', 'pip')} install -r ${req_path}`;
        exec(pipInstall, async (err) => {
            if (err) return console.error('Error installing requirements:', err);
            await Model.updateOne(
                { _id: recordId },
                { $set: { status: 'ready', venvPath } }
            );
            console.log('Environment setup complete');
        });
    })
} 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join('upload',req.body.user); 
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, dir); 
        });
    },
    filename: function (req, file, cb) {
        const inname = path.basename(file.originalname); 
        cb(null, inname); 
    }
});

const uploads = multer({ storage: storage });
router.post('/download/model/:name',authenticate,(req,res)=>{
    const {name}=req.params;
    console.log(name);
    console.log(req.body);
    const filepath= path.join(__dirname,'..','upload',req.body.user,name)
    console.log(filepath)
    res.download(filepath,name,(err)=>{
        console.log(err);
        console.log('here')
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Error downloading file' });
        }
    })
})
router.post('/upload',authenticate,uploads.fields([
    { name: 'model', maxCount: 1 },
    { name: 'script', maxCount: 1 },
    { name: 'requirements', maxCount: 1 }
]),async(req,res)=>{
    try {
        if (!req.files) {
            console.log('No file uploaded')
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log(req.files['requirements'][0].path)
        const fileName = req.files['model'][0].path.split('\\').pop();
        const record = {
            userId: req.body.userId,
            model: fileName,
            script: req.files['script'][0].path,
            requirement: req.files['requirements'][0].path,
            status: 'uploaded'
        };
        console.log('record created')
        const new_rec= await Model.create(record)
        console.log('model update before env')
        console.log(new_rec._id)
        await envSetup(new_rec._id)
        res.status(200).send({'message':'File Uploaded and Environment created'})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/predict',authenticate, async (req,res)=>{
    try {
        console.log(req.body);
        const {model_name,data_type,data}= req.body
        if(!model_name || !data){
            return res.status(400).json({
                error:'Model name or data or data type not provided'
            })
        }
        const record= await Model.findOne({'model':model_name})
        console.log(record)
        const envPath=path.resolve(record.venvPath,'Scripts','python')
        const scriptPath = record.script;
        execFile(envPath, [scriptPath, JSON.stringify(data)], (err, stdout, stderr) => {
            if (err) {
                console.error('Error executing Python script:', err);
                return res.status(500).json({ error: 'Failed to process request' });
            }
            if (stderr) {
                console.error('stderr:', stderr);
                return res.status(500).json({ error: 'Python script error' });
            }
            res.json({ result: stdout });
        })
       
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

module.exports = router;