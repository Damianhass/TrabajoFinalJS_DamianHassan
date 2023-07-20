let carrito = JSON.parse(localStorage.getItem("save_carrito")) || [];


let lista_productos = [
    {nombre: "Gabinete", precio: 30000, img:"./img/gabinete.png", stock: 10},
    {nombre: "Monitor", precio: 150000, img: "./img/monitor.png", stock: 10},
    {nombre: "Motherboard", precio: 60000, img: "./img/mother.png", stock: 10},
    {nombre: "Mouse", precio: 20000, img:"./img/mouse.png", stock: 10},
    {nombre: "Memoria ram", precio: 25000, img: "./img/ram.png", stock: 10},
    {nombre: "Teclado", precio: 15000, img: "./img/teclado.png", stock: 10}
];


function agregar_a_carrito(e){
    let boton = e.target;
    let nombre_producto = boton.parentElement.querySelector("h5").textContent;
    let precio_producto = boton.parentElement.querySelector("span").textContent;
    let img_producto = boton.parentElement.parentElement.querySelector("img").src;

    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        img: img_producto,
        stock: 10,

    };

    carrito.push(producto);
    guardar_carrito(carrito);
    calcular_costo_envio();
    render_carrito();

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true
    }).showToast();
};


function guardar_carrito(carrito_json){
    localStorage.setItem("save_carrito" , JSON.stringify(carrito_json));
};

function render_carrito(){
    

    let table = document.getElementById("tbody");
    table.innerHTML = "";

    for( let producto of carrito){
        let fila = document.createElement("tr");
        fila.innerHTML =`<td><img src="${producto.img}"></td>
                         <td><p>${producto.nombre}</p></td>
                         <td>${producto.stock}</td>
                         <td>${producto.precio}</td>
                         <td><button class="btn btn-danger borrar_elemento">borrar</button></td>`;
   
        table.append(fila);
    }

    let boton_borrar = document.querySelectorAll(".borrar_elemento")

    for(let boton of boton_borrar){
        boton.addEventListener("click" , borrar_producto);
    }
};


function borrar_producto(e){
    let nodo_a_eliminar = e.target.parentNode.parentNode;
    console.log(nodo_a_eliminar);
    let producto_eliminar = nodo_a_eliminar.querySelector("p").textContent;
    console.log(producto_eliminar);

    function eliminar_producto( producto ){
        return producto.nombre != producto_eliminar
    }
    let resultado_filter = carrito.filter( eliminar_producto );
    carrito = resultado_filter;
    guardar_carrito(carrito)
    render_carrito()

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #FF5733, #FFB347)",
        stopOnFocus: true
    }).showToast();
    
};

function calcular_costo_envio() {
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=d0f02e882df64d54a18d3fca7aba7b3f')
    .then(response => response.json())
    .then(data => {
        let costo_envio = document.getElementById("costo_envio");
        costo_envio.innerHTML = "";
        let fila_costo_envio = document.createElement("tr");
        fila_costo_envio.innerHTML = `<td></td>
                                      <td></td>
                                      <td></td>
                                      <td>Costo de envío</td>
                                      <td>${data.country_code === 'US' ? '$1000' : '$1500'}</td>`;
        costo_envio.append(fila_costo_envio);
    })
    .catch(error => console.log(error));
}

  

let boton_compra = document.querySelectorAll(".botonCompra");

for( let boton of boton_compra){
    boton.addEventListener("click", agregar_a_carrito);
};

let boton_carrito = document.getElementById("mostrar_carrito");

boton_carrito.addEventListener("click", function(){
    let carrito = document.getElementById("carrito");

    if(carrito.style.display != "none"){
        carrito.style.display = "none";
    }
    else{
        carrito.style.display = "block";
    }

});

render_carrito()









