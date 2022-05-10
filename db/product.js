const {mongoose}=require("./mongo-db-connect")
const {nanoid}= require("nanoid")


//* definition of products schema
let productsSchema= mongoose.Schema({
    //TODO Agregar descipcion a los productos
    id:{
        
        type:String,
        required:true,
        unique:true

    },
    productOwner:{
        type:String,
        required:true,
       



    },
    descripcion:{
        type:String,
        required:true,
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

    image:{
        type:String,
        required:true
    },
    QA: String 



})
//* Mediante product podemos modificar el esquema, agregar o quitar cosas.



async function saveProduct(){
    
    
    let newProduct = {
        id:nanoid(),
        name:"TestProduct0",
        productOwner:"testing",
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
// ! add db methods here


productsSchema.statics.getProducts=async (query)=>{
    //* query is an object 
    return await  product.find( query)

}
productsSchema.statics.addProduct= async(newProduct)=>{

 newProduct.id=nanoid()
 newProduct.QA=""
 let prodToSave= product(newProduct)
 let resp = await prodToSave.save()
 console.log(resp)
 


}


productsSchema.statics.getProductById=async (id)=>{

    return await product.findOne({id:id})




}


productsSchema.statics.deletePoduct= async(id)=>{
    let resp = await product.findByIdAndDelete(id)
    return resp
}
productsSchema.statics.updateProduct=async(id,updatedProduct)=>{
  

    let resp = await product.findByIdAndUpdate(id,updatedProduct)
    return resp
}

const product = mongoose.model("Products",productsSchema)

// async function deleteFromDb(){

//     await product.findOneAndDelete({id:"vJNqOzI2iMZ6Zaf5o7tRq"})
// }
//deleteFromDb()
// saveProduct()

module.exports={product}
