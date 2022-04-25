
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

    let{name,price,description,category,stock}=req.body;
    let headers=req.headers
    let productowner=headers.productowner //! Tenemos que validar en la base de datos que exista el product owner 
    if(name&&price&&description&&category&&stock&&productowner){

        let prodToadd=req.body
        prodToadd.productOwner=productowner

        // console.log(productowner)
        // console.log("Body: ",req.body)
        await product.addProduct(prodToadd)
    }
 


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
       
        dbQuery.name=new RegExp(name,'i')
    }
    if(category){
       
        dbQuery.category=new RegExp(category,'i')
    }
    if(max){
       
    }
    if(min){

    }
    products=  await product.getProducts(dbQuery)
    
    // * this function is async due to mongodb request  

    res.send(products)


})










app.listen(port, () => {
    console.log(`Running server at ${port}`)
  })
 