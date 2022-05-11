 /*
 
    *Question template


    `<tr>
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
                            <td width="45%" class="price">Pregunta</td>
                           
                            <td width="10%"><button class="round-black-btn small-btn">Add to Cart</button></td>
                           
    </tr>
    
    `
 
 
 
 */
async function answerInfo(id,idx){


    // let res= await fetch('/products/'+id)
    // let prod=await res.json()
    sessionStorage.setItem("prodToAnswer",id)
    sessionStorage.setItem("prodToAnswerIdx",idx)
    // console.log("La pregunta  a responder es  : ",prod.QA[idx])



}
async function putAnswer(){
    let id=sessionStorage.getItem("prodToAnswer")
    let idx=sessionStorage.getItem("prodToAnswerIdx")

    let res= await fetch('/products/'+id)
    let prod=await res.json()
    console.log("La pregunta  a responder es  : ",prod.QA[idx])
    let resp=document.getElementById("resId")
    let respuesta=resp.value
    prod.QA[idx].respuesta=respuesta;

    let  body={name:prod.name,descripcion:prod.descripcion,category:prod.category,price:prod.price,stock:prod.stock,image:prod.image,QA:prod.QA}
    let actProd= await fetch('/products/'+id,{
        method:'PUT',
        headers:{
            "Content-Type":" application/json"
        },
        body:JSON.stringify(body)





    })
    console.log(await actProd.json())
    loadQuestions()

}

async function getUsername(){

    let token=localStorage.getItem("token")
    console.log(token)
    let body= {   
        token:token
        
    }
    
    let username= await fetch('/username',{

        method:'PUT',
        headers:{
            "Content-Type":" application/json"
        },
        body:JSON.stringify(body)


    })


    // username=await username.json()
   
    // console.log(await username.json())
    return await username.json()





}
async function loadQuestions(){

    let username= await getUsername()
    let questionContainer=document.getElementById("questionsCont")
    let inner=`  `
    username=username.token
    console.log(username)
    let res= await fetch('/products?owner='+username)

    let products= await res.json()
    console.log(products)


 

    products.map(current=>{
        let questionsArray=current.QA
        console.log("Preguntas prendientes de :",current.name)
        for(let i=0; i<questionsArray.length; i++){

            if(questionsArray[i].respuesta==""){
                inner=inner+` 
                
                <tr>
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
                        <td width="45%" class="price">${questionsArray[i].pregunta}</td>
                    
                        <td width="10%"><button class="round-black-btn small-btn" onclick="answerInfo('${current.id}','${i}')"  data-toggle="modal" data-target="#exampleModal">Responder</button></td>
               
                </tr>
                
                
                
                
                
                
                `
                console.log(questionsArray[i])

            }
            
        }

    })
    

    
    questionContainer.innerHTML=inner



}
loadQuestions()