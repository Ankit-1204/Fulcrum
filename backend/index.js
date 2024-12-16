const express=require('express')
const cors =require('cors')
const dotenv = require('dotenv').config();
const model_router=require('./routes/model_route')
const auth_router=require('./routes/auth_route');
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
// I could use this later.....
// const corsOptions = {
//     origin: 'http://localhost:3000',  
//     methods: ['GET', 'POST'],        
//     allowedHeaders: ['Content-Type'],
//   };

const db_key= process.env.DB_KEY;
async function connect(){
  await mongoose.connect(db_key);
}
connect().catch((err)=>{console.log(err)});
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(model_router)
app.use(auth_router);
const PORT=3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });