

const host="http://localhost:3100"




async function loginToPage(){
    event.preventDefault()
    let pasword= document.getElementById("psw")
    let username=document.getElementById("usr")
    pasword=pasword.value
    username=username.value
    
    console.log(pasword,username)
    let res= await fetch('/login',
    {
        method:'POST',
        headers:{
            "Content-Type":" application/json"
        },
        body: JSON.stringify({pasword, username})
    }

    )

    res = await res.json()
    console.log(res)
    
    localStorage.setItem('token',res.token)
    

    if(res.error){


        alert(res.error)
    }
    if(res.token){
        window.location.replace("/MainPage.html");
    }
}



