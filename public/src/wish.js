

async function  loadWishlist(){
    let token= localStorage.getItem("token")

    let resp= await fetch('/wishlist',{
    
    
        method:'POST',
        headers:{
            "Content-Type":" application/json"
        },
        body: JSON.stringify({token})
    })


    let wishlist=await resp.json()

    console.table(wishlist.list)
    let inner=``
     
    for(let i=0; i<wishlist.list.length; i++){
        
        
        if(wishlist.list[i].producto!=undefined){

            let prd=  await fetch(`/products/${wishlist.list[i].producto}`,{

                    method:'GET'

            })
            let current=await prd.json()
    
            
            console.log(current)
            if(current.image==undefined){
                current.image="https://www.collinsdictionary.com/images/full/banana_64728013.jpg"
            }

            if(current.descripcion==undefined){
             current.descripcion="not description"
            }



            inner=inner+`<tr>
                            <td width="45%">
                                <div class="display-flex align-center">
                                    <div class="img-product">
                                        <img src="${current.image}">
                                    </div>
                                    <div class="name-product">
                                        ${current.name}
                                    </div>
                                </div>
                            </td>
                            <td width="15%" class="price">${current.price}</td>
                            <td width="15%"><span class="in-stock-box">${current.stock}</span></td>
                            <td width="15%"><button class="round-black-btn small-btn">Add to Cart</button></td>
                            <td width="10%" class="text-center"><a href="#" class="trash-icon"><i class="far fa-trash-alt"></i></a></td>
                        </tr>`

        }
        let container=document.getElementById("wishCont")
        container.innerHTML=inner

   
    }

     
}

/*

    * Product in whishlist shinnpet
  	<tr>
					        		<td width="45%">
					        			<div class="display-flex align-center">
		                                    <div class="img-product">
		                                        <img src="https://images.stockx.com/images/Funko-Pop-Disney-Pixar-Monsters-Sulley-Flocked-Amazon-Exclusive-Figure-1156.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1631821802" alt="" class="mCS_img_loaded">
		                                    </div>
		                                    <div class="name-product">
		                                        Sulley (FLocked)(Amazon)
		                                    </div>
	                                    </div>
	                                </td>
					        		<td width="15%" class="price">$550.00</td>
					        		<td width="15%"><span class="in-stock-box">In Stock</span></td>
					        		<td width="15%"><button class="round-black-btn small-btn">Add to Cart</button></td>
					        		<td width="10%" class="text-center"><a href="#" class="trash-icon"><i class="far fa-trash-alt"></i></a></td>
	</tr>


*/


loadWishlist()