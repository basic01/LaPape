
//-------------------------------------Inicio funcionalidades generales--------------------------
async function mandarData(url, data){
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    const resp = await response.json();
    return resp;
}
//-------------------------------------Fin funcionalidades generales------------------------------------



// ------------------------------------INICIO funcionalidad nav---------------------------

function mostrarEsconder(divId){
    div = document.getElementById(divId);
    if(div.style.display == 'none' || div.style.display == ""){
        div.style.display = 'block';
    }
    else{
        if(div.style.display == 'block'){
            div.style.display = 'none';
        }
    }   
}

function navegar(liga){
    window.location.assign(liga);
}

function navegarCompra(liga){
    if(localStorage.getItem('totales')){
        const url = liga + '?carrito=T';
        navegar(url);
    }
    else{
        alert('No hay artículos que comprar');
    }
}

// ------------------------------------Fin funcionalidad nav---------------------------


// ------------------------------------INCIO funcionalidad carrito---------------------------

    //Agregar funcionalidad a botones de cada tarjeta
    function addBtnFunctionality(){
        let btns = document.getElementsByClassName('btnTarjeta');
        for (let index = 0; index < btns.length; index++) {
            btns[index].addEventListener('click', agregarCarrito);
        }
    }

    //Vaciar carrito
    async function vaciarCarrito(){
        document.getElementById('shopping-cart-items').innerHTML = "";
        await datosDineroCompra();
        await guardarCarrito();
        await actualizarTotales();
    }

    //Borrar item de carrito
    async function deleteItem(){
        const div = event.target.parentElement;
        div.parentNode.removeChild(div);
        await datosDineroCompra();
        await guardarCarrito();
        await actualizarTotales();
    }


    //Actualizar datos de subtotal, envio y total
    async function datosDineroCompra(){
        const subtotal = document.getElementById('subtotal');
        const envio = document.getElementById('envio');                
        const total = document.getElementById('total');
        const sub = await obtenerSubtotal();
        const tot = sub + 50;
        subtotal.innerText = sub;
        if(sub == 0){
            subtotal.innerText = "0.00";
            envio.innerText = "0.00";
            total.innerText = "0.00";
        }
        else{
            envio.innerText = 50.00;
            total.innerText = tot;
            document.getElementById('cart-icon').style.backgroundColor = '#00609F';
            setTimeout(function(){
                document.getElementById('cart-icon').style.backgroundColor = '#1C1B1B';
            }, 800);
        }
        
    }

    //Agregar item a carrito
    async function agregarCarrito(){
        //Obtener div padre (div.tarjeta)
        let div = event.target.parentElement;
        if(div.id == 'detalles-tarjeta'){
            div = document.getElementById('tarjeta');
        }
        //Obtener valores de la tarjeta seleccionada
        const cantidad = div.getElementsByClassName('cant')[0].value;
        const id = div.getElementsByClassName('idProducto')[0].value;
        if(cantidad>0){
            const banderaItemExiste = await validarItemCarrito(id);
            if(!banderaItemExiste){
                const nombre = div.getElementsByClassName('nombre')[0].innerText;
                const imagen = div.getElementsByClassName('imagen')[0].src;
                const precio = div.getElementsByClassName('costo')[0].innerText;

                //Crear item y agrergarlo a carrito
                document.getElementById('shopping-cart-items').innerHTML += 
                    `
                    <div class="shopping-cart-item">
                        <img src=${imagen} alt="" class="shopping-cart-item-img">
                        <div class="shopping-cart-item-data">
                            <input type="hidden" class="idItem" name="" value=${id}>
                            <p class="shopping-cart-item-nombre">${nombre}</p>
                            <p class="shopping-cart-item-precio">Precio: $<span class="cart-item-precio">${precio}</span></p>
                            <p class="shopping-cart-item-cantidad">Cantidad: <span class="cart-item-cantidad">${cantidad}</span></p>
                        </div>
                        <i class="fas fa-trash eliminarItem" onclick="deleteItem()"></i>
                    </div>
                `;
                await datosDineroCompra();
                await guardarCarrito();
            }

            else{
                alert('Elemento ya está en el carrito');
            }   
        }
        else{
            alert('no hay cantidad');
        }
    }

    //Función para validar si ya está el item en el carrito
    async function validarItemCarrito(idItem){
        let bandera = false;
        const items = await document.querySelectorAll('.shopping-cart-item');
        items.forEach(element => {
            const id = element.getElementsByClassName('idItem')[0].value;
            if(idItem == id){
                bandera = true;
            }
        });
        
        return bandera;
    }

    //Obtener subtotal de las cantidades * el de cada item
    async function obtenerSubtotal(){
        const items = await document.querySelectorAll('.shopping-cart-item');
        let subtotal = 0;
        items.forEach(element => {
            let precio = element.getElementsByClassName('cart-item-precio')[0].innerText;
            let cantidad = element.getElementsByClassName('cart-item-cantidad')[0].innerText;
            cantidad = parseInt(cantidad);
            precio = parseFloat(precio);
            subtotal += cantidad * precio;
        });
        
        return subtotal;
    }

    //Guardar en localstorage items de carrito
    async function guardarCarrito(){

        const subtotal = document.getElementById('subtotal').innerText;

        if(subtotal != 0.00){
            const envio = document.getElementById('envio').innerText;                
            const total = document.getElementById('total').innerText;

            let cartTotals = {
                subtotal: subtotal,
                envio: envio,
                total: total,
            };

            let arrayCarrito = [];

            const items = await document.querySelectorAll('.shopping-cart-item');
            items.forEach(element => {
                const id = element.getElementsByClassName('idItem')[0].value;
                const nombre = element.getElementsByClassName('shopping-cart-item-nombre')[0].innerText;
                const imagen = element.getElementsByClassName('shopping-cart-item-img')[0].src;
                const precio = element.getElementsByClassName('cart-item-precio')[0].innerText;
                const cantidad = element.getElementsByClassName('cart-item-cantidad')[0].innerText;

                let cartItem = {
                    id: id,
                    nombre: nombre,
                    imagen: imagen,
                    precio: precio,
                    cantidad: cantidad
                };
                arrayCarrito.push(cartItem);
            });

            const carrito = JSON.stringify(arrayCarrito);
            localStorage.setItem('carrito', carrito);
            const tots = JSON.stringify(cartTotals);
            localStorage.setItem('totales', tots);
        }
        else{
            localStorage.removeItem('carrito');
            localStorage.removeItem('totales');
        }
    }

    //Checar si hay un carrito en el localstorage
    async function obtenerItemsCarrito(){
        let carrito = await localStorage.getItem('carrito');
        if(carrito){
            carrito = JSON.parse(carrito);

            carrito.forEach(element => {
                document.getElementById('shopping-cart-items').innerHTML += 
                    `
                    <div class="shopping-cart-item">
                        <img src=${element.imagen} alt="" class="shopping-cart-item-img">
                        <div class="shopping-cart-item-data">
                            <input type="hidden" class="idItem" name="" value=${element.id}>
                            <p class="shopping-cart-item-nombre">${element.nombre}</p>
                            <p class="shopping-cart-item-precio">Precio: $<span class="cart-item-precio">${element.precio}</span></p>
                            <p class="shopping-cart-item-cantidad">Cantidad: <span class="cart-item-cantidad">${element.cantidad}</span></p>
                        </div>
                        <i class="fas fa-trash eliminarItem" onclick="deleteItem()"></i>
                    </div>
                `;
             });

            await mostrarTotales('subtotal', 'envio', 'total');
        }
    }


// ------------------------------------Fin funcionalida carrito---------------------------



// ------------------------------------INCIO funcionalidad carrito.html---------------------------

async function mostrarTotales(idSubtotal, idEnvio, idTotal){
    let totales = await localStorage.getItem('totales');
    if(totales){
        totales = JSON.parse(totales);
        const subtotal = totales.subtotal;
        const envio = totales.envio;
        const total = totales.total;
        document.getElementById(idSubtotal).innerText = subtotal;
        document.getElementById(idEnvio).innerText = envio;
        document.getElementById(idTotal).innerText = total;
    }
    else{
        document.getElementById(idSubtotal).innerText = "0.00";
        document.getElementById(idEnvio).innerText = "0.00";
        document.getElementById(idTotal).innerText = "0.00";
    }
}

async function actualizarTotales(){
    const url_string = window.location.href;
    const direccion = new URL(url_string);
    const parametro = direccion.searchParams.get('carrito');
    if(parametro == 'T'){
        await mostrarTotales('pedido-subtotal', 'pedido-envio', 'pedido-total');
    }
}

async function mostrarItems(){
    const div = document.getElementById('items');

    let carrito = await localStorage.getItem('carrito');
        if(carrito){
            carrito = JSON.parse(carrito);

            carrito.forEach(element => {

            div.innerHTML += `
                <div class="itemDiv">
                    <img src=${element.imagen} alt="" class="shopping-cart-item-img">
                    <div class="shopping-cart-item-data">
                        <input type="hidden" class="idItem" name="" value=${element.id}>
                        <p class="shopping-cart-item-nombre">${element.nombre}</p>
                        <p class="shopping-cart-item-precio">Precio: $<span class="cart-item-precio">${element.precio}</span></p>
                        <p class="shopping-cart-item-cantidad">Cantidad: <span class="cart-item-cantidad">${element.cantidad}</span></p>
                    </div>
                    <i class="fas fa-trash eliminarItem"></i>
                </div>
            
            `;
            });
        }
}


// ------------------------------------Fin funcionalida carrito.html---------------------------