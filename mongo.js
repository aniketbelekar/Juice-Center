const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/react-oredr-conform")
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log("failed")
})

const newSchema = new mongoose.Schema({
    msg:{
        Type:String,
        required:true
    }
})

const collections=mongoose.model("collection,newSchema")

module.exports=collections