const express=require('express')
const cors =require('cors')
const dotenv = require('dotenv');
const multer =require('multer');
const path = require('path');
const axios=require('axios')
// I could use this later.....
// const corsOptions = {
//     origin: 'http://localhost:3000',  
//     methods: ['GET', 'POST'],        
//     allowedHeaders: ['Content-Type'],
//   };
const uploads=multer({dest:'upload/'});
dotenv.config()
const app=express()
app.use(cors())

const router=express.Router()
app.use(router)
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
const PORT=3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });