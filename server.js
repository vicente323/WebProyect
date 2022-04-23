
const {product}= require("./product")
const express= require("express")
const fs= require("fs")
const port= 3100;
const app= express()
app.use(express.json())

// ! Import middlewares here 

app.get('/products', async (req,res)=>{
    
    let products=  await product.getAllProducts()
    // * this function is async due to mongodb request  

    res.send(products)


})










app.listen(port, () => {
    console.log(`Running server at ${port}`)
  })
 