function splitToChunks(array,parts){

    // * revisar para despues como funciona  https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
    let result = []
    let divideN=9
    for (let i = parts; i > 0; i--) {
        if(array.length<9)divideN=array.length

        result.push(array.splice(0,divideN))
        
    }
    return result
}

/*
    *this page is for search in products



    * product cart template
    <div class="col-md-4">
		<figure class="card card-product-grid">
			<div class="img-wrap"> 
							<img src="https://as01.epimg.net/mexico/imagenes/2021/11/04/showroom/1636044314_006527_1636044462_noticia_normal.jpg" class="img-fluid">
				<a class="btn-overlay" href="./product.html"><i class=""></i> Quick view</a>
			</div> <!-- img-wrap.// -->
			<figcaption class="info-wrap"	>
				<div class="fix-height">
					<a href="#" class="title">Captain America</a>
					<div class="price-wrap mt-2">
						<span class="price">$280</span>
					</div> <!-- price-wrap.// -->
				</div>
				<a href="#" class="btn btn-block btn-primary">Add to cart </a>	
			</figcaption>
		</figure>
	</div> 
*/

async function redirectToProduct(id){

    event.preventDefault()
 
    sessionStorage.setItem("product",id)
    window.location.replace("Product.html");
}   





// `  `
async function addToWishList(id){

    let body={token: localStorage.getItem('token'),productID:id}
    console.log(body)
    let res = await fetch('/wishlist',{
    
    
        method:'PUT',
        headers:{
            "Content-Type":" application/json"
        },
        body: JSON.stringify(body)
     })
     console.log(await res.json())
    
}




async function addToCart(id){

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
     MainLoad()
}

async function newFilters(){
    let max=document.getElementById("MaxId")
    let min=document.getElementById("MinId")
    console.log(max.value)
    console.log(min.value)
}
async function  loadProducts(pagination){
    let pagina=pagination
    let max=document.getElementById("MaxId")
    let min=document.getElementById("MinId")

  
    console.log(pagina)
    let query='?'


    if(min!=null ){
        if(query!='?'){
            query=query+'&min='+min.value


        }
        else{

            query=query+'min='+min.value

        }

        
    }
    if(max!=null){
        if(query!='?'){
            query=query+'&max='+max.value


        }
        else{

            query=query+'max='+max.value

        }

        
    }
    if(sessionStorage.getItem("search")!=""){
        if(query!='?'){
            query=query+'&name='+sessionStorage.getItem("search")


        }
        else{

            query=query+'name='+sessionStorage.getItem("search")



        }
     
    }
    console.log("la busqueda es :"+query)
    let resp= await fetch('/products'+query,{
    
    
        method:'GET'
      
        
    })
    let prdcts= await resp.json()

    console.log("productos",prdcts)
    let itemContainer=document.getElementById("productsContainer")
    if(prdcts.length!=0){

            // * Calculamos el paginado
            let numOfContainers=Math.ceil(prdcts.length/9);
            console.log(numOfContainers)

            let paginadoContainer=document.getElementById("paginado")
            let inner=' <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>'
            for(let i=0; i<numOfContainers; i++){
                inner=inner+ `<li class="page-item "><a class="page-link" onclick="loadProducts('${i+1}')">${i+1}</a></li>`
            }
            inner=inner+'<li class="page-item"><a class="page-link" href="#">Next</a></li>'
            paginadoContainer.innerHTML=inner
            let itemCounter= document.getElementById("productLength")
            itemCounter.innerHTML="Productos encontrados :"+prdcts.length
           


            let productsDivided= splitToChunks(prdcts,numOfContainers)
            let currentCunk=productsDivided[pagina-1]
            let innerProducts=``

            for(let i=0;i<currentCunk.length;i++ ){
                
                if(currentCunk[i].image==undefined){
                    currentCunk[i].image="https://www.collinsdictionary.com/images/full/banana_64728013.jpg"
                }

                if(currentCunk[i].descripcion==undefined){
                    currentCunk[i].descripcion="not description"
                }

                innerProducts=innerProducts+`
                
                    <div class="col-md-4">
                        <figure class="card card-product-grid">
                            <div class="img-wrap"> 
                                            <img src="${currentCunk[i].image}"  style="height: 200px;">
                                <a class="btn-overlay" onclick="redirectToProduct('${currentCunk[i].id}')"><i class=""></i> Ver articulo </a>
                            </div> <!-- img-wrap.// -->
                            <figcaption class="info-wrap">
                                <div class="fix-height">
                                    <a href="#" class="title">${currentCunk[i].name}</a>
                                    <div class="price-wrap mt-2">
                                        <span class="price">$${currentCunk[i].price}</span>
                                    </div> <!-- price-wrap.// -->
                                </div>
                                <a class="btn  btn-primary col-8 mt-2 text-light" onclick="addToCart('${currentCunk[i].id}')" data-toggle="modal" data-target="#exampleModal" >Add to cart </a>	
                                <span href="#" class="btn btn-danger ml-2 mt-2" onclick="addToWishList('${currentCunk[i].id}')" data-toggle="modal" data-target="#exampleModal2">♥ </span>	
                            </figcaption>
                        </figure>
                    </div>     
                
                `
       

             }
    

    itemContainer.innerHTML=innerProducts




    }   
    else{

        itemContainer.innerHTML="No results given"
    }

    

}
loadProducts(1)