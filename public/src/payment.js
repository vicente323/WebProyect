const subtotal = Number(localStorage.getItem('subtotal'));
const envio = Number(localStorage.getItem('envio'));


async function loadOrder() {
    let token = localStorage.getItem('token')

    if (token != undefined) {

        let res = await fetch('/cart', {
            method: 'POST',
            headers: {
                "Content-Type": " application/json"
            },
            body: JSON.stringify({ token })
        })

        let prdcts = (await res.json())
        console.log(prdcts);
        console.log(prdcts.length)


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

        document.getElementById("botonCompra").onclick = function () { comprar() };
    }
}

async function generarRow(producto) {

    return `<div class="row justify-content-between">
    <div class="col-auto col-md-7">
        <div class="media flex-column flex-sm-row"> <img class=" img-fluid" src="${producto.image}" width="62" height="62">
            <div class="media-body my-auto">
                <div class="row ">
                    <div class="col-auto">
                        <p class="mb-0"><b>${producto.name}</b></p><small class="text-muted">Flocked</small><br><small class="text-muted">Funko Shop</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=" pl-0 flex-sm-col col-auto my-auto">
        <p class="boxed-1">2</p>
    </div>
    <div class=" pl-0 flex-sm-col col-auto my-auto ">
        <p><b>$550.00</b></p>
    </div>
</div>
<hr class="my-2">`
}

async function botonOrden() {

    let botOrden = document.getElementById('botonOrd');
    botOrden.innerHTML = `<div class="row mb-md-5">
    <div class="col">
    <button type="button" id="botonCompra" class="btn btn-lg btn-block" onclick:"comprar();" > PURCHASE $${subtotal + envio} </button>
    </div>
</div>`

}

async function comprar() {
    console.log("Se ejecuto la funcion compra")
    let token = localStorage.getItem('token');

    if (token != undefined) {

        if (document.getElementById('ciudad').value && document.getElementById('zip').value && document.getElementById('address').value && document.getElementById('estado').value && document.getElementById('tarjeta').value && document.getElementById('vencimiento').value) {
            let query = {
                token: token,
                total: subtotal + envio,
                address: document.getElementById('address').value + " . " + document.getElementById('ciudad').value + " , " + document.getElementById('estado').value + " . Codigo postal " + document.getElementById('zip').value + " . "
            };

            console.log(query);

            let res = await fetch('/recibos', {
                method: 'POST',
                headers: {
                    "Content-Type": " application/json"
                },
                body: JSON.stringify(query)
            })
            let doc = (await res.json())
            console.log(doc);
            window.location.replace("OrderConfirmation.html");
        } else {
            alert("Favor de llenar todas las casillas");
        }
















    }
}

async function getCantidades() {

    let quant = document.getElementById("cantidades");
    quant.innerHTML =
        `<div class="row ">
            <div class="col">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <p class="mb-1"><b>Subtotal</b></p>
                    </div>
                    <div class="flex-sm-col col-auto">
                        <p class="mb-1"><b>${subtotal}</b></p>
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col">
                        <p class="mb-1"><b>Shipping</b></p>
                    </div>
                    <div class="flex-sm-col col-auto">
                        <p class="mb-1"><b>${envio}</b></p>
                    </div>
                </div>
                <hr class="my-0">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <p><b>Total</b></p>
                    </div>
                    <div class="flex-sm-col col-auto">
                        <p class="mb-1"><b>${subtotal + envio}</b></p>
                    </div>
                </div>
                
            </div>
        </div>`
}

loadOrder();
botonOrden();
getCantidades();

