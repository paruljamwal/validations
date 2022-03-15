
 const app=require("./index");
const connect=require("./config/db");
app.listen(5444,async()=>{
  try{
    await connect()
    console.log("Listining port 5444")
  }
  catch(err){
      console.log(err.message)
  }
 
  
})