
const initialConfig= require("./dbConfig")
const mongoose =require("mongoose")

const mongoUrl=initialConfig.getUrl()

    console.log(mongoUrl)
    
    mongoose.connect(mongoUrl,{

        useNewUrlParser:true
        
    }).then(()=>{

        console.log("conected to products db sucsessfully ")
    }).catch((err)=>{
        console.log("An error has happened",err)
    })

    module.exports={mongoose}