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
    console.log("username get wish:",username.username)
    console.log("username get wish:",username.owner)
    let usertosearch=username.username;
    let list;
    if(usertosearch==undefined){
         list=await wishlist.find({owner:username.owner});
        
    }
    else{
        list=await wishlist.find({owner:usertosearch});


    }
    console.log("lista desde get",list)
    if(list.length==0){
        console.log("entramos al if")
        console.log("Error Found")
       
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