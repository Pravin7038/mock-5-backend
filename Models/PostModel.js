const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    first_name:{type:String},
    last_name:{type:String},
    email:{type:String},
    department:{type:String},
    salary:{type:Number},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
});

const Post = mongoose.model("employee",PostSchema);

module.exports = Post;