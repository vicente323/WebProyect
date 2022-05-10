
const { product } = require("./db/product");
const { User } = require("./db/User");
const {wishlist}= require("./db/wishlist")
const express = require("express")
const fs = require("fs");
const { query } = require("express");
const port = 3100;
const app = express()
const {auth }=require("./middlewares/auth")
const shortid = require("shortid");
const jwt=require("jsonwebtoken");
const { compareHash } = require("./utils/crypt");

app.use('/',express.static('public'))

app.use(express.json())

app.post('/products',auth, async (req, res) => {
    console.log("----Post product----")
   
    let { name, price, descripcion, category, stock ,image} = req.body;
    let productowner = req.username
    console.log(productowner)
    
    if (name && price && descripcion && category && stock && image) {

        let prodToadd ={name:name,productOwner:req.username,price:price,stock:stock,category:category,descripcion:descripcion,image:image}
        


        console.log("producto",prodToadd)
        await product.addProduct(prodToadd)
        res.status(201).send({success:"product created"})
    }
    else{

        res.status(404).send({error:"bad request"})

    }
    


})

app.get('/products', async (req, res) => {
    console.log("--------Get--------")
    let products;
    //todo: Implement a regex for min and max 
    let { name, category, min, max, id } = req.query;
    let dbQuery = {}
    let minMaxQuery = {}
    if (id) {
        dbQuery.id = id
    }
    if (name) {

        dbQuery.name = new RegExp(name, 'i')
    }
    if (category) {

        dbQuery.category = new RegExp(category, 'i')
    }
    if (max) {
        minMaxQuery.$lte = max
        dbQuery.price = minMaxQuery

    }
    if (min) {
        minMaxQuery.$gte = min
        dbQuery.price = minMaxQuery
    }
    console.log(dbQuery)
    products = await product.getProducts(dbQuery)

    // * this function is async due to mongodb request  

    res.send(products)

})

app.delete('/products/:id', async (req, res) => {
    console.log("--------delete--------")
    console.log(req.params.id)
    let ret = await product.deletePoduct(req.params.id);

    if (ret) {

        res.status(200).send(ret + " ha sido eliminado")
    } else { res.status(404).send({ error: "Notfound" }) }

})

app.get('/products/:id',async (req,res)=>{

    let id= req.params.id
    let ret = await product.getProductById(id)
    if(ret){


        res.send(ret)
    }
    else{

        res.status(404).send({error:"Notfound"})
        return
    }

})

app.put('/products/:id',async (req,res)=>{
    console.log("------Put------")
    let { name, price, description, category, stock } = req.body;

    // let productowner=headers.productowner //! Tenemos que validar en la base de datos que exista el product owner 
    if (name && price && description && category && stock) {

        let productUpdated = req.body
        // productUpdated.productOwner=productowner


        let ret = await product.updateProduct(req.params.id, productUpdated)
        if (ret) {
            res.send(ret)
            return
        }
        else {
            res.status(404).send({ error: "Notfound" })
            return

        }


    }

    res.status(404).send({ error: "Notfound" })


})



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////
////////////////
////////////////                             Usuarios
////////////////
////////////////
////////////////
////////////////

/*
    todo: Add login endpoint  (ended)


*/

app.post('/login',async(req,res)=>{
    console.log("-------Login-------")
    const firma= "DASW"
    let{username,pasword}=req.body;
    console.log(username)
    console.log(pasword)
    let resp= await User.login(username);
    let user=resp[0]
 


   

    if(user!=undefined){
        if( await compareHash(pasword,user.password)){
           

            let token = jwt.sign({username:user.username,email:user.email},firma,{expiresIn:60*40});
            console.log({token})
            res.status(202).send({token});

        }
        else{

            res.status(404).send({error:"Username or password not valid"});
        }
       
       
    }
    else{

        res.status(404).send({error:"Username or password not valid"});
    }
    
   


})



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
        res.send(user.username + " ha sido eliminado")
    } else {
        res.status(404).send({ error: " no encontrado" })
    }
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
////////////////
////////////////
////////////////                             Shopping cart    (Vicente)
////////////////
////////////////
////////////////
////////////////(
app.post('/cart', auth,async(req,res)=>{



    let query={username:req.username,email:req.email}
    let user = await User.findUser(query)   
    user=user[0]
    let cart=user.carrito
    res.send(cart).status(202)

})

app.put('/cart',auth,async(req,res)=>{
    
    
    // * Todos los productos que se le mandan a este metodo existen en la base de datos ya que son los mismos que se despliegan desde la interface inicial 

    // * Este metodo recibe un token dado por el usuario pada validar su login y tener sus datos 
    let {productID,cant}=req.body;
    
    
    console.log(productID,cant);

    // * Una vez que validamos el login en la req tenemos disponible  req.email y  req.username
    let query={username:req.username,email:req.email}
    let user = await User.findUser(query)
    // console.log(user)

    user=user[0]

    let cart=user.carrito
    // console.log(cart)

    // * Este cart funciona como un proxy ya que se tiene solo los id's y las cantidades 

    let exist=false;
    cart.map(prd=>{


            if(prd.producto==productID){
                
                prd.cantidad=prd.cantidad+cant;
                exist=true;
            }



    })
    if(!exist)cart.push({producto:productID,cantidad:cant})

  


    await  User.updateCart(user,cart)

    res.send(cart).status(202)

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////
////////////////
////////////////    Wishlist    (Vicente)
////////////////
////////////////
////////////////
////////////////
app.put('/wishlist',auth,async(req,res)=>{
    let username={owner:req.username}
    let wish;
    console.log(username)


    let {productID}=req.body;
  
      
        wish= await wishlist.getList(username);
        


        if(wish!=[]){
            wish=wish[0]
            let exist=false;
            wish=wish.list
            console.log("inside the if ",wish)
        
        
            
            wish.map(prd=>{
        
        
                if(prd.producto==productID){
                    
                    
                    exist=true;
                }
        
        
        
            })
            if(!exist)wish.push({producto:productID})
            console.log(wish)
            await wishlist.addToList(username,wish)

        }
       

    
        else{

                console.log("error solverd")
                wish= await wishlist.createList(username.owner)
                wish=[]
                wish.push({producto:productID})
                await wishlist.addToList(username,wish)
                
            }
   
    res.send(wish).status(202)


})
/* 
    ! Este metodo se hizo post pero funciona como  get ya que de otra manera no me deja mandar body en el fetch para mandar el token
    !Pienso solucionarlo despues con la info que encontre 
    Todo: https://stackoverflow.com/questions/48187482/pass-payload-in-get-request-react-fetch (solucion)

*/
app.post('/wishlist',auth,async(req,res)=>{
    let username={username:req.username}
    let wish= await wishlist.getList(username);

    wish=wish[0]
    res.send(wish).status(202)
})




app.listen(port, () => {
    console.log(`Running server at ${port}`)
})


