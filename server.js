
const {product}= require("./product")
const express= require("express")
const fs= require("fs");
const { query } = require("express");
const port= 3100;
const app= express()
app.use(express.json())

// ! Import middlewares here 
app.post('/products',async (req,res)=>{
    console.log("----Post product----")

    console.log("Body: ",req.body)


})

app.get('/products', async (req,res)=>{
    console.log("--------Get--------")
    let products;
    //todo: Implement a regex for min and max 
    let {name,category,min,max,id}=req.query;
    let dbQuery={}
    if(id){
        dbQuery.id=id
    }
    if(name){
        //todo: Este metodo solo busca la palabra completa necesitamos implementar regex
        dbQuery.name=name
    }
    if(category){
        //todo: Este metodo solo busca la palabra completa necesitamos implementar regex
        dbQuery.category=category
    }

    products=  await product.getProducts(dbQuery)
    
    // * this function is async due to mongodb request  

    res.send(products)


})










app.listen(port, () => {
    console.log(`Running server at ${port}`)
  })
 