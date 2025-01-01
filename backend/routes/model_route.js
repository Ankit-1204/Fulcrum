const express=require('express')
const multer =require('multer');
const fs = require('fs');
const path = require('path');
const axios=require('axios')
const authenticate =require('../middleware/auth');


const router=express.Router()

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
router.post('/upload',authenticate,uploads.single('file'),(req,res)=>{
    try {
        console.log(req.body)
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.status(200).json({message:'File Uploaded Successfully',file:req.file})
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/predict',authenticate,(req,res)=>{
    const {model_name,inputs,user}= req.body()
    try {
        const data = {
            'model_name':model_name,
            'inputs':inputs,
            'user':user
        }
        const response=axios.post('http://localhost:5000/predict',data);
        res.json({'output':response});
    } catch (error) {
        console.log(`error is ${error}`);
    }
})

module.exports = router;