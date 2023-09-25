const express = require("express");
const app = express();
require("dotenv").config();
const mongoose  = require("mongoose")
const UserRoute = require("./Routes/UserRoute");
const PostRoute = require("./Routes/PostRoute")
const cors = require("cors")
app.use(express.json());
app.use(cors())
app.use("/user",UserRoute);
app.use("/employees",PostRoute)

app.get("/",(req,res)=>{

    res.send("Welcome to the server")
})

const connect = async()=>{

    try {

        await mongoose.connect(process.env.URL);
        console.log("connected");
        
    } catch (error) {
        
        console.log(error)
    }
}

app.listen(8080,()=>{

    console.log("listen");

    connect()
})