const carrito = document.getElementById('carrito');
const guitarras = document.getElementById('lista-guitarras');
const listaGuitarras = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    guitarras.addEventListener('click', comprarGuitarra);
    carrito.addEventListener('click', eliminarGuitarra);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarGuitarra(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const guitarra = e.target.parentElement.parentElement;
        leerDatosCafe(guitarra);
    }
}

function leerDatosCafe(guitarra) {
    const infoGuitarra = {
        imagen: guitarra.querySelector('img').src,
        titulo: guitarra.querySelector('h4').textContent,
        precio: guitarra.querySelector('.precio span').textContent,
        id: guitarra.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoGuitarra);
}

function insertarCarrito(guitarra) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${guitarra.imagen}" width=100>
        </td>
        <td>${guitarra.titulo}</td>
        <td>${guitarra.precio}</td>
        <td>
            <a href="#" class="borrar-guitarra" data-id="${guitarra.id}">X</a>
        </td>
    `;
    listaGuitarras.appendChild(row);
    guardarCafeLocalStorage(cafe);
}


function eliminarGuitarra(e) {
    e.preventDefault();

    let guitarra,
    guitarraId;
    if(e.target.classList.contains('borrar-guitarra')){
        e.target.parentElement.parentElement.remove();
        guitarra = e.target.parentElement.parentElement;
        guitarraId = cafe.querySelector('a').getAttribute('data-id');
    }
    eliminarCafeLocalStorage(guitarraId);
}

function vaciarCarrito() {
    while(listaGuitarras.firstChild){
        listaGuitarras.removeChild(listaGuitarras.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

function guardarGuitarraLocalStorage(guitarra) {
    let guitarras;
    guitarras = obtenerGuitarrasLocalStorage();
    guitarras.push(guitarra);
    localStorage.setItem('guitarra', JSON.stringify(guitarras))
}

function obtenerGuitarrasLocalStorage() {
    let guitarrasLS;

    if(localStorage.getItem('guitarras') === null){
        guitarrasLS = [];
    } else {
        guitarrasLS = JSON.parse(localStorage.getItem('guitarras'));
    }
    return guitarrasLS;
}

function leerLocalStorage() {
    let guitarrasLS;

    guitarrasLS = obtenerGuitarrasLocalStorage();

    guitarrasLS.forEach(function(guitarra){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${guitarra.imagen}" width=100> 
            </td>
            <td>${guitarra.titulo}</td>
            <td>${guitarra.precio}</td>
            <td>
                <a href="#" class="borrar-guitarra" data-id="${guitarra.id}">X</a>
            </td>
        `;
        listaGuitarras.appendChild(row);
    });

}

function eliminarCafeLocalStorage(guitarra) {
    let guitarrasLS;

    guitarrasLS = obtenerGuitarrasLocalStorage();

    guitarrasLS.forEach(function(guitarrasLS, index){
        if(guitarrasLS.id === guitarra) {
            guitarrasLS.splice(index, 1)
        }
    });

    localStorage.setItem('guitarras', JSON.stringify(guitarrasLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}