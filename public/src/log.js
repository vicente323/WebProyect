

const host="http://localhost:3100"




async function loginToPage(){
    event.preventDefault
    let pasword= document.getElementById("psw")
    let username=document.getElementById("usr")
    pasword=pasword.value
    username=username.value


    

    
    console.log(pasword,username)
    let res= await fetch(`${host}/login`,
    {
        method:'POST',
        headers:{
            "password":pasword,
            "username":username
        }
    }



    )

    res = await res.json()
    console.log(res)
    


}


async function print(){

  let test= await fetch(`${host}/products`,{method:'GET'})
  let response= await test.json()
  console.log(response) 
}

console.log("log charged")


print()