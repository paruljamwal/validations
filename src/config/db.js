const mongoose=require("mongoose")
const connect=()=>{
    return  mongoose.connect("mongodb+srv://parul:paru@cluster0.ednsm.mongodb.net/validation?retryWrites=true&w=majority");
    }

    module.exports=connect;