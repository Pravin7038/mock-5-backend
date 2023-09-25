const express = require("express")
const route = express.Router();
const Post = require("../Models/PostModel");
const auth = require("../Middleware")
route.get("/",auth,(req,res)=>{

    try {
        const posts = Post.find()

        res.send({data:posts})
        
    } catch (error) {
        
        res.send({msg:error})
    }
})

route.post("/add",auth,async(req,res)=>{

    try {

       await Post.create({...req.body,creator:req.userId});

       res.send({msg:"New employee created"})
        
    } catch (error) {
        
        res.send({msg:error})
    }
})

route.delete("/delete/:id",auth,async(req,res)=>{

    try {

        const post = await Post.findOne({ _id: req.params.id });
        console.log(post)
        if(post.creator.toString()===req.userId){

            await Post.findOneAndDelete({_id:req.params.id});

            res.send({msg:"Employee Deleted"})
        }
        else{

            res.send({msg:"You are not authorised to delete this employee"})
        }
        
    } catch (error) {
        
        res.send({msg:error})
    }
})
module.exports = route