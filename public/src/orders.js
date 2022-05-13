async function loadOrders() {
    let token = localStorage.getItem('token')

    if (token != undefined) {

        let res = await fetch('/recibos', {
            method: 'POST',
            headers: {
                "Content-Type": " application/json"
            },
            body: JSON.stringify({ token })
        })

        let recibos = (await res.json())
        console.log(recibos);

        
        var fichasRecibo = [];

        for (let i = 0; i < recibos.length; i++) {
            fichasRecibo.push(await crearRecibo(recibos[i]));
        };

        let inner = fichasRecibo.join('');

        let rcps = document.getElementById("recibs");
        rcps.innerHTML = inner;

        console.log("Se ejecuto la load");



        /* console.log(prdcts.length)


        var contenido = [];


        for (let i = 0; i < prdcts.length; i++) {
            
            console.log(prdcts[i])

            let prd = await fetch(`/products/${prdcts[i].producto}`, {

                method: 'GET'

            })

            let current = await prd.json();

            if (current.image == undefined) {
                current.image = "https://www.collinsdictionary.com/images/full/banana_64728013.jpg"
            }

            if (current.descripcion == undefined) {
                current.descripcion = "not description"
            }

            console.log(current);
            contenido.push(await generarRow(current));
        }
        

        let inner = contenido.join('');

        let list = document.getElementById("ordPed");
        list.innerHTML = inner;


        console.log("Se ejecuto la load");

        document.getElementById("botonCompra").onclick = function() {comprar()};
        */
    }
}

loadOrders();

async function crearRecibo(orden) {
    var fecha = orden.fecha;
    var direccion = orden.address;
    var lista = orden.list;
    var contenido = [];

    for (let i = 0; i < lista.length; i++) {
        contenido.push(await crearTarjeta(lista[i].producto));
    };

    let inner = contenido.join('');

    return `<div class="media-container d-flex justify-content-center row p-5 border border-succses mt-5 "
                style=" border-radius: 10px;">
        <h2 class="col-12 mb-5" style="width: 10%;">Pedido realizado en ${fecha}</h2>
        <h2 class="col-12 mb-5" style="width: 10%;">Entrega en ${direccion}</h2>
        ${inner}

            </div>`
}

async function crearTarjeta(id) {
    console.log(id);

    let prd = await fetch(`/products/${id}`, {
        method: 'GET'
    }
    )

    let prod = await prd.json();

    return `<div class="media border m-4 p-4 flex-fill">
        <img class="mr-3 " src="${prod.image}" width="62" height="62"
            alt="Generic placeholder image">
            <div class="media-body">
                <h5 class="mt-0">${prod.name}</h5>${prod.descripcion}
            </div>
    </div>`

}