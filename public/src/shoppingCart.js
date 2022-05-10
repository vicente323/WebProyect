/*
            html shopping cart product  shnippet

            <div class="row border-top border-bottom">
                    <div class="row main align-items-center">
                        <div class="col-2">
                            <img class="img-fluid"
                                src="https://www.collinsdictionary.com/images/full/banana_64728013.jpg">
                        </div>
                        <div class="col">
                            <div class="row text-muted">Platano Chiapas</div>
                            <div class="row">Platano traido de chiapas</div>
                        </div>
                        <div class="col"> 
                        </div>




                        <div class="col">&dollar; 30.00 <span class="close">&#10005;</span></div>
                    </div>
            </div>




*/
// `  `

async function loadCart(){



    let token =   localStorage.getItem('token')

    //* por cuestiones de tiempo no hice un  metodo para validar el token asi que use cualquiera que usara el middleware auth
    if(token!=undefined){
         let total=0;
         let items=0;
         let inner=`<div class="title">
         <div class="row">
             <div class="col">
                 <h4><b>Mi carrito</b></h4>
             </div>
             
         </div>
         </div> `


     
    
        let res = await fetch('/cart',{
    
    
            method:'POST',
            headers:{
                "Content-Type":" application/json"
            },
            body: JSON.stringify({token})
         })

         let prdcts=(await res.json())


         console.log(prdcts.length)


         for(let i=0; i<prdcts.length; i++){
               items++;
               console.log(prdcts[i])


               let prd=  await fetch(`/products/${prdcts[i].producto}`,{

                        method:'GET'

               })
               let current=await prd.json()
               if(current.image==undefined){
                   current.image="https://www.collinsdictionary.com/images/full/banana_64728013.jpg"
               }

               if(current.descripcion==undefined){
                current.descripcion="not description"
               }

               inner= inner+` <div class="row border-top border-bottom">
               <div class="row main align-items-center">
                   <div class="col-2">
                       <img class="img-fluid"
                           src="${current.image}">
                   </div>
                   <div class="col">
                       <div class="row text-muted">${current.name}</div>
                       <div class="row">${current.descripcion}</div>
                   </div>
                   <div class="col"> 
                   </div>




                       <div class="col">&dollar; ${current.price} <span class="close" onclick="deleteFromCart('${prdcts[i].producto}')">&#10005;</span></div>
                   </div>
               </div>`
               total=total+current.price

         }


         let cont= document.getElementById("productList")
         let itemCount=document.getElementById("itemCount")
         cont.innerHTML=inner;
         itemCount.innerHTML=`<div class="row" id="itemCount">
                                    <div class="" style="padding-left:0;" >productos   : ${items}    </div> <div class=" text-right ml-5">    &dollar;Total : ${total}</div>
                              </div>`
    }    
  


}

/*
           <div class="row" id="itemCount">
                    <div class="col" style="padding-left:0;" >ITEMS: 0</div>
                    <div class="col text-right">&dollar; 132.00</div>
           </div>

*/


async function deleteFromCart(id){
    event.preventDefault()
    
    let token =   localStorage.getItem('token')
    console.log("tried to delete",id)
    let body= {   
        token:token,
        productID :id
        
    }
    let req= await fetch('/cart',{
        
        method:'DELETE',
        headers:{
            "Content-Type":" application/json"
        },
       body:JSON.stringify(body)

    })

    /*to show changes in the shopping cart*/
    loadCart()

}

loadCart()
