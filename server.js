
<<<<<<< HEAD
const {product}= require("./db/product")
const express= require("express")
const fs= require("fs");

const port= 3100;
const app= express()
=======
const { product } = require("./db/product")
const { User } = require("./db/User");
const express = require("express")
const fs = require("fs");
const { query } = require("express");
const port = 3100;
const app = express()

const shortid = require("shortid");


//const { auth, validarUsuario, requireAdmin } = require("./middlewares/auth");


>>>>>>> c2fb672e20da35cc1ce5c7f2c52660e462d30200
app.use(express.json())

// ! Import middlewares here 
app.post('/products', async (req, res) => {
    console.log("----Post product----")

    let { name, price, description, category, stock } = req.body;
    let headers = req.headers
    let productowner = headers.productowner //! Tenemos que validar en la base de datos que exista el product owner 
    if (name && price && description && category && stock && productowner) {

        let prodToadd = req.body
        prodToadd.productOwner = productowner

        // console.log(productowner)
        // console.log("Body: ",req.body)
        await product.addProduct(prodToadd)
    }



})

app.get('/products', async (req, res) => {
    console.log("--------Get--------")
    let products;
    //todo: Implement a regex for min and max 
<<<<<<< HEAD
    let {name,category,min,max,id}=req.query;
    let dbQuery={}
    let minMaxQuery={}
    if(id){
        dbQuery.id=id
=======
    let { name, category, min, max, id } = req.query;
    let dbQuery = {}
    if (id) {
        dbQuery.id = id
>>>>>>> c2fb672e20da35cc1ce5c7f2c52660e462d30200
    }
    if (name) {

        dbQuery.name = new RegExp(name, 'i')
    }
    if (category) {

        dbQuery.category = new RegExp(category, 'i')
    }
<<<<<<< HEAD
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
    
=======
    if (max) {

    }
    if (min) {

    }
    products = await product.getProducts(dbQuery)

>>>>>>> c2fb672e20da35cc1ce5c7f2c52660e462d30200
    // * this function is async due to mongodb request  

    res.send(products)


})



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////
////////////////
////////////////                             Usuarios
////////////////
////////////////
////////////////
////////////////


app.get('/users', async (req, res) => {
    console.log(req.query);
    console.log(req.userId);
    
    let { name, username } = req.query;
    let users = await User.getUsers();
    res.send(users);
})

app.get('/users/:id', async (req, res) => {
    console.log(req.params.id);
    let user = await User.getUser(req.params.id);

    if (user) {
        res.send(user)
    } else {
        res.status(404).send({ error: " no encontrado" })
    }
})

app.delete('/users/:id', async (req, res) => {
    console.log(req.params.id);
    let user = await User.deleteUser(req.params.id);

    if (user) {
        res.send(user)
    } else {
        res.status(404).send({ error: " no encontrado" })
    }
})





<<<<<<< HEAD
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
=======
app.delete('/users/:id', async (req, res) => {

    let doc = await User.deleteUser();
    res.status(404).send({ error: "no se encontró usuario" })

})

app.post('/users', async (req, res) => {
    console.log(req.body);
    let newUser = {};
    let { name, email, username, password } = req.body;

    if (name && email && username) {
        newUser.name = name;
        newUser.email = email;
        newUser.username = username;
        newUser.password = password;
        let doc = await User.saveUser(newUser);
        res.status(201).send(doc);
    } else {
        res.status(400).send("Faltan datos")
    }
})

app.put('/users/:id', async (req, res) => {

    let user = await User.getUser(req.params.id);
    let { name, username, email, password } = req.body;
    if (user) {
        user.name = name ? name : user.name;
        user.username = username ? username : user.username;
        user.email = email ? email : user.email;
        user.password = password ? password : user.password;
        let doc = await User.updateUser(user);
        res.send(doc);
    } else {
        res.status(404).send({ error: "no existe" })
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
>>>>>>> c2fb672e20da35cc1ce5c7f2c52660e462d30200




app.listen(port, () => {
    console.log(`Running server at ${port}`)
})
