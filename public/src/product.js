
/*  

        <div class="container  col-4   d-flex justify-content-center  ">
        
            <img class="" src="https://m.media-amazon.com/images/I/61A34gN0jfL._AC_SL1500_.jpg" alt=""  style="width: 400px; height: 400px; ">
            


        </div>

        <div class="container   col-4">
            <h1>Corsair CA-9011185-NA Diadema Virtuoso Wireless Carbon, Negro, Grande</h1>
            <hr>
            <!-- <span class=" " style="color:gold;"   >★★★★★</span> -->
            <h4 class="pt-2 ">Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat perspiciatis ut provident dolorum harum fugit.</h4>
               
            


        </div>
       
        <form class="container   d-flex justify-content-center   col-4">
            <div class="border   p-4 border  " style="border-radius:4px;">

                        
                <h1 class="">$ 3,000</h1>
                <!-- Shipping date -->
                <h9>Entrega GRATIS el Sábado, Marzo 19</h9>
                <hr>
                <div class="   " style="width:100%; height:170px; ">
                    <!-- Colonia -->
                    <p> Santa María Tequepexpan</p>

                    <p> Anillo Perif. Sur Manuel Gómez Morín 8585</p>
                    <!-- Postal code -->
                    <p>Cp:  45604</p>
                    <!-- City -->
                    <p>San Pedro Tlaquepaque, Jal.</p>
                </div>
                <input type="number" class="form-control   mt-3  mb-3 " style="width: 30%;" required>
        
                <button type="button submit" class="btn btn-warning btn-lg mt-4" style="width: 100%;  margin-bottom: 20%;" > add to cart</button>
         
              

            </div>
                    
       

        </form>










*/


async function  validateLoginFromProd(){

    let token =   localStorage.getItem('token')
    console.log("ciclado")
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
    *Question template

    <div class="border p-3 m-2 mt-3" style="border-radius: 5px;">
                
                <div class="">
                        <!--Answer question structure  -->
                        <p>Pregunta: Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatum omnis perspiciatis molestias aspernatur cumque?</p>
                        <hr>
                        <p class="ml-2">Respuesta: Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatum omnis perspiciatis molestias aspernatur cumque</p>
                </div>
    </div>



*/

async function addToCartPrd(id){
 
    let body={token: localStorage.getItem('token'),productID:id,cant:1}
    console.log(body)
    let res = await fetch('/cart',{
    
    
        method:'PUT',
        headers:{
            "Content-Type":" application/json"
        },
        body: JSON.stringify(body)
     })
     console.log(await res.json())
    await    MainLoad()
}




async function addToCartButton(){

    if(await validateLoginFromProd()){
        console.log("logeado")
        await addToCartPrd(sessionStorage.getItem("product"))
        
    }
    else{



        window.location.replace("http://localhost:3100/log.html");

    }




}
async function addQA(){
    let id=sessionStorage.getItem("product")
    
    let res= await fetch('/products/'+id)
    let pregunta=document.getElementById("QAid")
    let prod = await res.json()
    pregunta=pregunta.value;
    console.log(prod)
    let QAarray=prod.QA
    console.log("pregunta:  ",pregunta)
    let newQuesion={

        pregunta:pregunta,
        respuesta:""


    }
    QAarray.push(newQuesion)
   

    
    let actuBody={name:prod.name,descripcion:prod.descripcion,category:prod.category,price:prod.price,stock:prod.stock,image:prod.image,QA:QAarray}
    let act= fetch('/products/'+id,{
        method:'PUT',
        headers:{
            "Content-Type":" application/json"
        }, 
        body:JSON.stringify(actuBody)



    })

    loadProduct()



}


async function loadQA(prod){
    console.log("funcion loadQA")
    let questionsCont=document.getElementById("questionsId")
   
    if(prod.QA.length==0){
        if(await validateLoginFromProd()){

            questionsCont.innerHTML='<h1 class="ml-5">No questions yet</h1> <button type="button " class="btn btn-warning btn-lg mt-4" style="width: 100%;  margin-bottom: 20%;"  data-toggle="modal" data-target="#exampleModal"> add a question</button>'

        }
        else{
            questionsCont.innerHTML='<h1 class="ml-5">No questions yet</h1>'
        }
        
        console.log("No questions yet")
    }
    else{

        let preguntas=''
        if(await validateLoginFromProd()){
            for(let i=0; i<prod.QA.length; i++){

                    preguntas=preguntas+`   <div class="border p-3 m-2 mt-3" style="border-radius: 5px;">
                
                    <div class="">
                            <!--Answer question structure  -->
                            <p>Pregunta: ${prod.QA[i].pregunta}</p>
                            <hr>
                            <p class="ml-2">Respuesta: ${prod.QA[i].respuesta}</p>
                    </div>
                </div> `


            }
            questionsCont.innerHTML=preguntas+'<button type="button " class="btn btn-warning btn-lg mt-4" style="width: 100%;  margin-bottom: 20%;"  data-toggle="modal" data-target="#exampleModal"> add a question</button>'

        }
        else{

            for(let i=0; i<prod.QA.length; i++){

                preguntas=preguntas+`   <div class="border p-3 m-2 mt-3" style="border-radius: 5px;">
            
                <div class="">
                        <!--Answer question structure  -->
                        <p>Pregunta: ${prod.QA[i].pregunta}</p>
                        <hr>
                        <p class="ml-2">Respuesta: ${prod.QA[i].respuesta}</p>
                </div>
            </div> `


            }
            questionsCont.innerHTML=preguntas
        }

        



    }



}
async function loadProduct(){

    let id= sessionStorage.getItem("product")

    let res= await fetch('/products/'+id)

  

    let prodCont=document.getElementById("productContainerId")
    let  current=await res.json()

    let QA=current
    await loadQA(QA)

    if(current.image==undefined){
        current.image="https://www.collinsdictionary.com/images/full/banana_64728013.jpg"
    }

    if(current.descripcion==undefined){
     current.descripcion="not description"
    }

    prodCont.innerHTML=` 
    
    <div class="container  col-4   d-flex justify-content-center  ">
        
    <img class="" src="${current.image}" alt=""  style="width: 400px; height: 400px; ">
    


</div>

<div class="container   col-4">
    <h1>${current.name}</h1>
    <hr>
    <h7 class="pt-2 ">Vendedor:</h7>
    <h7 class="pt-2 ">${current.productOwner}</h7>
    <h6>Categoria:  ${current.category}</h6>
    <h4 class="pt-2 mt-4 ">Descripcion:</h4>
    <h4 class="pt-2 ">${current.descripcion}</h4>
    
       
    


</div>

<div class="container   d-flex justify-content-center   col-4">
    <div class="border   p-4 border  " style="border-radius:4px;">

                
        <h1 class="">$ ${current.price}</h1>
        <!-- Shipping date -->
        <h9>Entrega GRATIS el Sábado, Marzo 19</h9>
        <hr>
        <div class="   " style="width:100%; height:170px; ">
            <!-- Colonia -->
            <p> Santa María Tequepexpan</p>

            <p> Anillo Perif. Sur Manuel Gómez Morín 8585</p>
            <!-- Postal code -->
            <p>Cp:  45604</p>
            <!-- City -->
            <p>San Pedro Tlaquepaque, Jal.</p>
        </div>
       

        <button type="button " class="btn btn-warning btn-lg mt-4" style="width: 100%;  margin-bottom: 20%;" onclick="addToCartButton()"> add to cart</button>
 
      

    </div>
            


</div>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    `
}

loadProduct()