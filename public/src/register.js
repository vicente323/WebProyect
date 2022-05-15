async function guardarUsuario(event) {
    event.preventDefault();

    nombre = document.getElementById("nombre").value + ' ' + document.getElementById("apellido").value;
    usuario = document.getElementById("nusuario").value;
    correo = document.getElementById("correo").value;
    password = document.getElementById("passw").value;
    cpassword = document.getElementById("cpassw").value;

    let newUser = {
        "name": nombre,
        "username": usuario,
        "email": correo,
        "password": password,
        "cpassword": cpassword
    }

    jsonNuser = JSON.stringify(newUser);
    console.log(jsonNuser);

    let res = await fetch('/users',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonNuser
        }
    );

    if (res.status == 201) {
        window.location.replace("http://localhost:3100/MainPage.html");
    }else{
        alert(res.error)
    }
}

