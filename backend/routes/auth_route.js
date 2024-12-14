const express=require('express')
const axios=require('axios')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../model/auth_model')

const router=express.Router()

router.post('/auth/signup', async (req,res)=>{
    try{
        const {username,password} =req.body;
        const salt= await  bcrypt.genSalt(10);
        const hash= await bcrypt.hash(password,salt);

        const user = await User.findOne({username});
        if(user){
            return res.status(404).send({'message':'User already exists.'})
        }else{
            const new_user= new User({'username':username,'password':hash})
            await new_user.save();
            console.log('user created');
            return res.status(202).send({'message':'User is created'});
        }
    }catch(error){
        console.log(error);
        return res.status(500).send({'message':error});
    } 
})
router.post('/auth/login',async (req,res)=>{
    try {
        const {username,password}=req.body;

    } catch (error) {
        
    }
})

