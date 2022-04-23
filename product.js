



const {mongoose}=require("./mongo-db-connect")
const {nanoid}= require("nanoid")


//* definition of products schema

let productsSchema= mongoose.Schema({

    id:{
        
        type:String,
        required:true,
        unique:true

    },
    name:{
        type:String,
        required:true
    },
    price:{

        type:Number,
        min: 1,
        max: 999999,
        required: true
    },
    stock:{
        
        type:Number,
        min: 1,
        max: 999999,
        required: true

    },
    category:{
        
        type:String,
        required: true
    },
    QA: String 



})
//* Mediante product podemos modificar el esquema, agregar o quitar cosas.



const product = mongoose.model("Products",productsSchema)

async function saveProduct(){
    
    
    let newProduct = {
        id:nanoid(),
        name:"TestProduct1",
        price:1,
        stock:1,
        category:"testing",
        QA:""
    }
    let prodToSave= product(newProduct)
    let resp = await  prodToSave.save();
    console.log(resp);

}

async function findProducts(query){


 /*   
    * empty query means find all
    * query structure Example: {name:"TestProduct1"}
    * We can also use regex as well
    * The method <schema>.find(query) retunrs an array of objects 
    * we can show certain atributes sending as second argument {query},{<atribute>:(0 or 1)} 0 = off and 1 = on
*/     
    let products = await  product.find({},{name:1})
    console.log(products)
}



productsSchema.statics.getAllProducts=async ()=>{

    return await  product.find()

}
// saveProduct()

// findProducts()