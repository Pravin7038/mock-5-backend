const express = require("express");
const route = express.Router()
const bcrypt = require("bcrypt")
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken")
//New user registration route
route.post("/signup",async(req,res)=>{

    const {email,password,confirm_password} = req.body
    try {

        const newPass = await bcrypt.hash(password,10);

        await User.create({...req.body,password:newPass,confirm_password:newPass});

        res.send({msg:"New User Registered"})

        
    } catch (error) {

        res.send({msg:error})
        
    }
})

//User login route

route.post("/login",async(req,res)=>{

    const {email,password} = req.body
    try {

        const user = await User.findOne({email:email})
        
        const verify = await bcrypt.compare(password,user.password);

        if(verify){

           const token =  await jwt.sign({user_id:user._id},"pravin");

           res.send({msg:"Login Successful",token:token})
        }
        else{

            res.send({msg:"Password is incorrect"})
        }
        
    } catch (error) {
        
        res.send({msg:error})
    }
})

module.exports = route