const express=require('express')
const multer =require('multer');
const path = require('path');
const axios=require('axios')


const router=express.Router()
const uploads=multer({dest:'upload/'});
router.get('/download/model/:name',(req,res)=>{
    const {name}=req.params;
    const filepath= path.join(__dirname+'name')

    res.download(filepath,name,(err)=>{
        console.log(err);
        res.status(404).json({ error: 'Model not found' });
    })
})
router.post('/upload',uploads.single('file'),(req,res)=>{
    try {
        res.status(200).json({message:'File Uploaded Successfully',file:req.file})
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/predict',(req,res)=>{
    const {model_name,inputs}= req.body()
    try {
        const data = {
            'model_name':model_name,
            'inputs':inputs
        }
        const response=axios.post('http://localhost:5000/predict',data);
        res.json({'output':response});
    } catch (error) {
        console.log(`error is ${error}`);
    }
})

module.exports = router;