const {mongoose}=require("./mongo-db-connect")


let  wishlistSchema= mongoose.Schema(


    {


        owner:{
            type:String,
            unique:true 
        },
        list: [{
            producto: {
                type: String 
                // * Este producto es el id o codigo interno
            }
        }]


    }




)

wishlistSchema.statics.getList=async(username)=>{

    let list=await wishlist.find(username);
   
    if(list===[]){
        console.log("Error Found")
        let err={Error:"Error Found"}
        throw err;
    }
    return list

}
wishlistSchema.statics.deleteToList=async(username,updatedWishlsit)=>{


    return await wishlist.findOneAndUpdate(username,{list:updatedWishlsit});

}
wishlistSchema.statics.addToList=async(username,updatedWishlsit)=>{


    return await wishlist.findOneAndUpdate(username,{list:updatedWishlsit});

}
wishlistSchema.statics.createList=async(username)=>{
    let  list={

        owner:username,
        list:[]

    }
    let listToSave=wishlist(list)

    let resp=await listToSave.save()
    return [];


}




const wishlist = mongoose.model("wishlist",wishlistSchema)

module.exports={wishlist}