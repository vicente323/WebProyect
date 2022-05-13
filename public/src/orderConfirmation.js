async function loadConfirmation() {
    let token = localStorage.getItem('token')

    let reUs = await fetch('/users', {
        method: 'POST',
        headers: {
            "Content-Type": " application/json"
        },
        body: JSON.stringify({ token})
    })

    let usr = (await reUs.json())
    console.log(usr[0].name);

    document.getElementById("usuario").innerHTML = `<span class="font-weight-bold d-block mt-4">Hola, ${usr[0].name}</span> <span>Tu orden ha sido confirmada y llegará en los proximos dias</span>`




































    let res = await fetch('/recibos', {
        method: 'POST',
        headers: {
            "Content-Type": " application/json"
        },
        body: JSON.stringify({ token, last: true })
    })

    let recibos = (await res.json())
    let lastR = recibos[0];
    console.log("=========  ultimo recibo ===========");
    console.log(lastR);
    console.log("====================================");


    document.getElementById('dateOrder').innerHTML = `<span>${lastR.fecha}</span>`
    document.getElementById('shpAd').innerHTML = `</div><span>${lastR.address}</span>`

    var prdOrd = [];

    for (let i = 0; i < lastR.list.length; i++) {

        //console.log(lastR.list[i]);
        var map = {
            id: lastR.list[i].producto,
            quant: lastR.list[i].cantidad
        }
        prdOrd.push(await crearRow(map));

    };

    let inner = prdOrd.join('');
    document.getElementById("psOrds").innerHTML = inner;

    let innerCot = await cotizacion(lastR.total);
    document.getElementById("cotizacion").innerHTML = innerCot;



}

loadConfirmation();



async function crearRow(map) {

    console.log(map.id);

    let prd = await fetch(`/products/${map.id}`, {
        method: 'GET'
    }
    )

    let prod = await prd.json();
    console.log(prod);

    return `<tr>
        <td width="20%"> <img src="${prod.image}" width="90"> </td>
        <td width="60%"> <span class="font-weight-bold">${prod.name}</span>
            <div class="product-qty">
                <span class="d-block">Cantidad : ${map.quant}</span>
                <span class="d-block">Precio : ${prod.price}</span>
                <span>Type:Flocked,Funko Shop</span></div>
        </td>
        <td width="20%">
            <div class="text-right"> <span class="font-weight-bold">$${prod.price * map.quant}</span> </div>
        </td>
    </tr>`
}

async function cotizacion(total) {

    var envio = localStorage.getItem("envio");

    return ` <tr>
                <td>
                    <div class="text-left"> <span class="text-muted">Subtotal</span></div>
                </td>
                <td>
                    <div class="text-right"> <span>$${total - envio}</span> </div>
                </td>
            </tr>
<tr>
    <td>
        <div class="text-left"> <span class="text-muted">Costo de Envio</span> </div>
    </td>
    <td>
        <div class="text-right"> <span>$${envio}</span> </div>
    </td>
</tr>
<tr class="border-top border-bottom">
    <td>
        <div class="text-left"> <span class="font-weight-bold">Total</span> </div>
    </td>
    <td>
        <div class="text-right"> <span class="font-weight-bold">$${total}</span> </div>
    </td>
</tr>`

}