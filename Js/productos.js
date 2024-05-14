let carrito = [];
let totalCarrito = 0;

function cargarCarritoDesdeLocalStorage() {
    const carritoJSON = localStorage.getItem('carrito');
    if (carritoJSON) {
        carrito = JSON.parse(carritoJSON);
        totalCarrito = 0;
        carrito.forEach(item => {
            totalCarrito += item.precio;
        });
        mostrarCarrito();
    }
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    totalCarrito += precio;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Se ha agregado "${nombre}" al carrito de compras.`);
    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';

    const cantidadProductosSpan = document.getElementById('CantidadProductos');
    cantidadProductosSpan.textContent = carrito.length.toString();

    const cantidadProductos = {};

    carrito.forEach(item => {
        if (cantidadProductos[item.nombre]) {
            cantidadProductos[item.nombre]++;
        } else {
            cantidadProductos[item.nombre] = 1;
        }
    });

    Object.entries(cantidadProductos).forEach(([nombre, cantidad]) => {
        const productoHTML = `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${nombre} (${cantidad})</h6>
                </div>
                <span class="text-body-secondary">$${carrito.find(item => item.nombre === nombre).precio}</span>
            </li>
        `;
        listaCarrito.insertAdjacentHTML('beforeend', productoHTML);
    });

    const totalHTML = `
        <li class="list-group-item d-flex justify-content-between">
            <span>Total (CLP)</span>
            <strong>$${totalCarrito}</strong>
        </li>
    `;
    listaCarrito.insertAdjacentHTML('beforeend', totalHTML);
}

function vaciarCarrito() {
    carrito = [];
    totalCarrito = 0;
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

window.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);

