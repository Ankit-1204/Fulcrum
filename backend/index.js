const express=require('express')
const cors =require('cors')
const dotenv = require('dotenv');
const model_router=require('./routes/model_route')
const bodyParser=require('body-parser')
// I could use this later.....
// const corsOptions = {
//     origin: 'http://localhost:3000',  
//     methods: ['GET', 'POST'],        
//     allowedHeaders: ['Content-Type'],
//   };

dotenv.config()
const app=express()
app.use(cors())
app.use(model_router)

const PORT=3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });