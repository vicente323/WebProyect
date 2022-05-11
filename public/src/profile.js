async function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }

    return values;
}

allStorage();

async function infoUsuario() {

    user = { username: localStorage.getItem('user') }

    let res = fetch('/users',
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            body: user
        }
    );

    let data = await res.json();
    console.log(data);
}

async function editar(event) {
    let campo = event.target.id;
    console.log(campo);

    var x = document.getElementById(campo + ",put");
    var y = document.getElementById(campo + ",close");
    var z = document.getElementById(campo);
    var ip = document.getElementById(campo + ",input");

    if (x.style.display === "none" & y.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
        ip.disabled = false;
    }
}

async function cancelar(event) {
    let datos = event.target.id.split(",");
    let uuid = datos[0];
    var x = document.getElementById(uuid + ",put");
    var y = document.getElementById(uuid + ",close");
    var z = document.getElementById(uuid);
    var ip = document.getElementById(uuid + ",input");

    if (x.style.display === "block" & y.style.display === "block") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        ip.disabled = true;
    }

}

async function confirmar(event) {
    let datos = event.target.id.split(",");
    let uuid = datos[0];
    var x = document.getElementById(uuid + ",put");
    var y = document.getElementById(uuid + ",close");
    var z = document.getElementById(uuid);
    var ip = document.getElementById(uuid + ",input");

    if (x.style.display === "block" & y.style.display === "block") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        ip.disabled = true;
    }

    cant = document.getElementById(uuid + ",input").value;
    console.log(cant);
    console.log(uuid);

    let resp = await fetch('https://products-dasw.herokuapp.com/api/carts/' + uuid, {
        method: 'POST',
        body: JSON.stringify({ "amount": cant }),
        headers: {
            "x-expediente": 723382,
            "x-user": localStorage.getItem("user"),
            "Content-Type": "application/json"
        }
    })

    let data = await resp.json();

    console.log(resp);
    console.log(data);

    getCarrito();
}