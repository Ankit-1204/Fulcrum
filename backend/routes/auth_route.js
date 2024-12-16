const express=require('express')
const axios=require('axios')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../model/auth_model')

const key=process.env.JWT_KEY;

const router=express.Router()

router.post('/auth/signup', async (req,res)=>{
    try{
        console.log(req.body);
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
        const user =User.findOne({username});
        if(!user){
            res.status(404).send({'message':'Username not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(404).send({'message':'Incorrect Password'});
        }else{
            const token= jwt.sign({data:username},key,{expiresIn:'2hr'});
            res.status(200).send({'token':token});
        }
    } catch (error) {
        console.log('login token error',error);
        res.status(404).send({'message':error});
    }
})

module.exports=router

