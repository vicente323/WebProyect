
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
async function loadProduct(){

    let id= sessionStorage.getItem("product")

    let res= await fetch('/products/'+id)

  

    let prodCont=document.getElementById("productContainerId")
    let  current=await res.json()
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
    <!-- <span class=" " style="color:gold;"   >★★★★★</span> -->
    <h4 class="pt-2 ">Descripcion:</h4>
    <h4 class="pt-2 ">${current.descripcion}</h4>
    
       
    


</div>

<form class="container   d-flex justify-content-center   col-4">
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
        <input type="number" class="form-control   mt-3  mb-3 " style="width: 30%;" required>

        <button type="button submit" class="btn btn-warning btn-lg mt-4" style="width: 100%;  margin-bottom: 20%;" > add to cart</button>
 
      

    </div>
            


</form>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    `
}

loadProduct()