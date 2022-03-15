const express=require("express");
const usercontroller=require("../src/controller/usercontroller");
const app=express();
app.use(express.json())
app.use("/user",usercontroller)
module.exports=app