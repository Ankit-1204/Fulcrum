const express=require('express')
const cors =require('cors')
const dotenv = require('dotenv');

// I could use this later.....
// const corsOptions = {
//     origin: 'http://localhost:3000',  
//     methods: ['GET', 'POST'],        
//     allowedHeaders: ['Content-Type'],
//   };

dotenv.config()
const app=express()
app.use(cors())

const router=express.Router()
router.get('/download/model/:name',(req,res)=>{
    const {name}=req.params;
    const filepath= path.join(__dirname+'{name}')

    res.download(filepath,name,(err)=>{
        console.log(err);
        res.status(404).json({ error: 'Model not found' });
    })
})

app.listen(3000)