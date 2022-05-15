
async function infoUsuario() {
    let token = localStorage.getItem('token')
    console.log(token);

    if (token != undefined) {
        let res = await fetch('/users',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            }
        );
        let data = await res.json();
        console.log(data);
        console.log(data[0]);
        return (data[0]);
    }
}

async function tablaPerfil() {
    let mapa = await infoUsuario();
    console.log(mapa);

    document.getElementById('tabla').innerHTML = `
    <table>
                    <tr>
                        <td>Nombre</td>
                        <td style="width:70%">
                            <div class="input-group mb-2 row ml-1">

                                <input type="text" class="form-control col-6" id="name,${mapa.name},input" placeholder="${mapa.name}" disabled>

                                <button class="btn btn-info" id="name,${mapa.name}" onclick="editar(event)" style="display:block"><i class="fa fa-pencil"></i></button>

                                <button class="btn btn-success" style="display:none" id="name,${mapa.name},put" onclick="confirmarNombre(event)" style="display:none"><i class="fa fa-check"></i></button>

                                <button class="btn btn-danger" style="display:none" id="name,${mapa.name},close" onclick="cancelar(event)" style="display:none"><i class="fa fa-window-close"></i></button>
                           
                                </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre de usuario</td>
                        <td>
                            <div class="input-group mb-2 row ml-1">

                                <input type="text" class="form-control col-6" id="username,${mapa.username},input" placeholder="${mapa.username}" disabled>

                                <button class="btn btn-info" id="username,${mapa.username}" onclick="editar(event)"><i class="fa fa-pencil"></i></button>

                                <button class="btn btn-success" style="display:none" id="username,${mapa.username},put" onclick="confirmarUserName(event)"><i class="fa fa-check"></i></button>

                                <button class="btn btn-danger" style="display:none" id="username,${mapa.username},close" onclick="cancelar(event)"><i class="fa fa-window-close"></i></button>
                            </div>
                        </td>
                    </tr>
                    </tr>
                    <tr>
                        <td>Correo electronico</td>
                        <td>
                            <div class="input-group mb-2 row ml-1">
                            <input type="text" class="form-control col-6" id="email,${mapa.email},input" placeholder="${mapa.email}" disabled>

                            <button class="btn btn-info" id="email,${mapa.email}" onclick="editar(event)"><i class="fa fa-pencil"></i></button>

                            <button class="btn btn-success" style="display:none" id="email,${mapa.email},put" onclick="confirmarEmail(event)"><i class="fa fa-check"></i></button>

                            <button class="btn btn-danger" style="display:none" id="email,${mapa.email},close" onclick="cancelar(event)"><i class="fa fa-window-close"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Contraseña</td>
                        <td>
                            <div class="input-group mb-2 row ml-1">
                            <input type="password" class="form-control col-6" id="password,${mapa.password},input" placeholder="${mapa.password}" disabled>

                            <button class="btn btn-info" id="password,${mapa.password}" onclick="editar(event)"><i class="fa fa-pencil"></i></button>

                            <button class="btn btn-success" style="display:none" id="password,${mapa.password},put" onclick="confirmarPassword(event)"><i class="fa fa-check"></i></button>

                            <button class="btn btn-danger" style="display:none" id="password,${mapa.password},close" onclick="cancelar(event)"><i class="fa fa-window-close"></i></button>
                            
                            </div>
                        </td>
                    </tr>
                </table>`
}

tablaPerfil();

async function editar(event) {
    let datos = event.target.id.split(",");
    let campo = datos[0];
    let valor = datos[1];

    var x = document.getElementById(campo + ',' + valor + ",put");
    var y = document.getElementById(campo + ',' + valor + ",close");
    var z = document.getElementById(campo + ',' + valor);
    var ip = document.getElementById(campo + ',' + valor + ",input");

    if (x.style.display === "none" & y.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
        ip.disabled = false;
    }
}

async function cancelar(event) {
    let datos = event.target.id.split(",");
    let campo = datos[0];
    let valor = datos[1];

    var x = document.getElementById(campo + ',' + valor + ",put");
    var y = document.getElementById(campo + ',' + valor + ",close");
    var z = document.getElementById(campo + ',' + valor);
    var ip = document.getElementById(campo + ',' + valor + ",input");

    if (x.style.display === "block" & y.style.display === "block") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        ip.disabled = true;
    }

}

async function confirmarNombre(event) {

    let mapa = await infoUsuario();
    let userId = mapa.id;

    let body = { name: document.getElementById('name,' + mapa.name + ',input').value };
    console.log(body);
    let res = await fetch('/users/' + userId,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    let data = await res.json();
    console.log(data[0]);

    location.reload();
}

async function confirmarUserName(event) {

    let mapa = await infoUsuario();
    let userId = mapa.id;

    let body = { username: document.getElementById('username,' + mapa.username + ',input').value };
    console.log(body);
    let res = await fetch('/users/' + userId,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    window.location.replace("http://localhost:3100/MainPage.html");

    let data = await res.json();
    console.log(data[0]);
    location.reload();

    //location.reload(); 
}

async function confirmarEmail(event) {

    let mapa = await infoUsuario();
    let userId = mapa.id;

    let body = { email: document.getElementById('email,' + mapa.email + ',input').value };
    console.log(body);
    let res = await fetch('/users/' + userId,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    let data = await res.json();
    console.log(data[0]);

    location.reload();

}