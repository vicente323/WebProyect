
const {product}= require("./db/product")
const express= require("express")
const fs= require("fs");

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
    let minMaxQuery={}
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
        minMaxQuery.$lte=max
        dbQuery.price=minMaxQuery
       
    }
    if(min){
        minMaxQuery.$gte=min
        dbQuery.price=minMaxQuery
    }
    console.log(dbQuery)
    products=  await product.getProducts(dbQuery)
    
    // * this function is async due to mongodb request  

    res.send(products)


})




app.delete('/products/:id' ,async (req,res)=>{
    console.log("--------delete--------")
    console.log(req.params.id)
    let ret = await product.deletePoduct(req.params.id);
    
    if (ret){

        res.status(200).send(ret)
        return
    }
    res.status(404).send({error:"Notfound"})
})

app.put('/products/:id',async (req,res)=>{
    console.log("------Put------")
    let{name,price,description,category,stock}=req.body;

   // let productowner=headers.productowner //! Tenemos que validar en la base de datos que exista el product owner 
    if(name&&price&&description&&category&&stock){

        let productUpdated=req.body
       // productUpdated.productOwner=productowner

  
        let ret=await product.updateProduct(req.params.id,productUpdated)
        if(ret){
                res.send(ret)
                return
        }
        else{
            res.status(404).send({error:"Notfound"})
            return

        }
        
        
    }   
    
    res.status(404).send({error:"Notfound"})
 

})




app.listen(port, () => {
    console.log(`Running server at ${port}`)
  })
 