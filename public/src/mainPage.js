/*
    * Esta pagina valida si existe un token y si es valido para cargar ciertas cosas en la main page 



*/

function logOut(){

    localStorage.removeItem('token')
    window.location.replace("http://localhost:3100/MainPage.html");



}




async function  validateLogin(){

let token =   localStorage.getItem('token')

//* por cuestiones de tiempo no hice un  metodo para validar el token asi que use cualquiera que usara el middleware auth
if(token!=undefined){


    let res = await fetch('/wishlist',{


        method:'POST',
        headers:{
            "Content-Type":" application/json"
        },
        body: JSON.stringify({token})
     })

        

    //  console.log(res.status)


     if(res.status==401){


        console.log("Not logged validated",res)
        return false
     }
     else{


        console.log("logged validated")
        return true
     }
    
    
    
}
else{



        
    console.log("Not logged validated")
    return false
}

}
/*

    
        <div class="collapse navbar-collapse" id="collapsibleNavIdContainer">
            <ul class="navbar-nav  ml-5 mt-2 mt-lg-0 ml-auto ">
              
              
                <li class="nav-item dropdown ">
                    <a class="nav-link dropdown-toggle  pr-4" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mi cuenta</a>
                    <div class="dropdown-menu" aria-labelledby="dropdownId">
                        <a class="dropdown-item" href="./log.html"  >Ingresar</a>
                        <a class="dropdown-item" href="./register.html"  >Registro</a>
                        
                        
                        <hr>
                        <a class="dropdown-item" href="./createProduct.html">publicar producto</a>
                        <a class="dropdown-item" href="./wishlist.html"   >wishlist</a>
                        <a class="dropdown-item" href="orders.html">Mis pedidos</a>
                        <a class="dropdown-item" href="./profile.html">Perfil</a>
                    </div>
                </li>
                <li class="nav-item active pr-4">
                    <a class="nav-link" href="shopping_cart.html"><i class="fas fa-shopping-cart      "></i> <span class="sr-only">(current)</span>2</a>
                </li>
            </ul>
            
        </div>


*/

 async function calculateShoppingCart(){
  
    if(await validateLogin()){
        let token=localStorage.getItem('token') 
        let res = await fetch('/cart',{
    
    
            method:'POST',
            headers:{
                "Content-Type":" application/json"
            },
            body: JSON.stringify({token})
        })
         let prdcts=(await res.json())

    
        return (prdcts.length)



    }
    else{

        return 0;
    }




 }


async function  MainLoad(){
    /* 
        * La idea de esta funcion es ejecutarse cuando se abra la pagina validando el token y modificando las opciones del usuario en base a si se encuentra loggeado o no 

    */

    let cartNumber=await calculateShoppingCart()
 
    if( await validateLogin()){

       
        let dropMenu= document.getElementById("collapsibleNavIdContainer")
        let inner =` 
      
          
                 <li class="nav-item dropdown ">
                     <a class="nav-link dropdown-toggle  pr-4" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mi cuenta</a>
                     <div class="dropdown-menu" aria-labelledby="dropdownId">
                         
                         
                         
                         <a class="dropdown-item" href="./createProduct.html">publicar producto</a>
                         <a class="dropdown-item" href="./wishlist.html"   >wishlist</a>
                         <a class="dropdown-item" href="orders.html">Mis pedidos</a>
                         <a class="dropdown-item" href="./profile.html">Perfil</a>
                         
                         <a class="dropdown-item" onclick="logOut()">Log Out</a>
                         
                     </div>
                 </li>
                 <li class="nav-item active pr-4">
                     <a class="nav-link" href="shopping_cart.html"><i class="fas fa-shopping-cart "  ></i> <span class="sr-only">(current)</span>${cartNumber}</a>
                 </li>

           
          `
            
         dropMenu.innerHTML=inner;
     
     
        
        
     }
     
     else{
     
     
     
         let dropMenu= document.getElementById("collapsibleNavIdContainer")
         let inner =` 
             
                  <li class="nav-item dropdown ">
                      <a class="nav-link dropdown-toggle  pr-4" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mi cuenta</a>
                      <div class="dropdown-menu" aria-labelledby="dropdownId">
                          
                      <a class="dropdown-item" href="./log.html"  >Ingresar</a>
                      <a class="dropdown-item" href="./register.html"  >Registro</a>
                        
                      
                      </div>
                  </li>
                  <li class="nav-item active pr-4">
                      <a class="nav-link" href="log.html"><i class="fas fa-shopping-cart"  ></i> <span class="sr-only">(current)</span>${cartNumber}</a>
                      </li>

               `
          dropMenu.innerHTML=inner;
      
        
      
      
      }
 
      
      

}

