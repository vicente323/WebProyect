


async function createProduct(){
    event.preventDefault()
    let token=localStorage.getItem("token")
    let name= document.getElementById("nameId")
    name=name.value;
    let price=document.getElementById("precioId")
    price=price.value;
    let stock= document.getElementById("stockId")
    stock=stock.value
    let image=document.getElementById("imageId")
    image=image.value
    let unidad=document.getElementById("unidadId")
    unidad=unidad.value
    let desc=document.getElementById("descId")
    desc=desc.value
    let cat=sessionStorage.getItem("category")
    if(cat==undefined||name==""||price==""||stock==""||image==""||desc==""||unidad==""){
        
        alert("Responde todos los campos")
        return 


    }
    let body={name:name,descripcion:desc,price:price,stock:stock,image:image,token:token,category:cat}
    let res = await fetch('/products',{

        method:'POST',
        headers:{
            "Content-Type":" application/json"
        }, 
        body:JSON.stringify(body)





    })
    console.log(await res.json( ))
    

    
}

async function setCategory(category){


    sessionStorage.setItem("category",category)


}