// Variables
const carrito = document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];
cargarEventListeners();


function cargarEventListeners(){

    // Agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar del carrito
    carrito.addEventListener('click',eliminarCurso);

    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = [];

        limpiarHTML();
    });
    document.addEventListener('DOMContentLoaded', () => {
        const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
        console.log(carritoLocal);
        articulosCarrito = [...carritoLocal];
        carritoHTML();
    });

}

// Funciones
function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')){
        e.preventDefault();
        // cursoSeleccionado = e.target.parentElement.children[0].textContent;
        cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

        actualizarLocalStorage();
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // console.log(cursoId);
        let cursos = articulosCarrito.map(curso => {
            if(curso.id === cursoId){
                curso.cantidad--;
                return curso;
            } else {
                return curso; // Retorla los objetos no actualizados
            }
        });

        cursos = cursos.filter(curso => curso.cantidad !== 0);

        articulosCarrito = [...cursos];        
        
        // cursoEliminar[0].cantidad--;
        // articulosCarrito =[...cursoEliminar,...articulosCarrito];
        
        // Elimina por el ID
    }
    // console.log(articulosCarrito);
    actualizarLocalStorage();
    carritoHTML();
}

// Contenido del cursos
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //
   
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    // console.log(existe);
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorla los objetos no actualizados
            }
        });
        articulosCarrito = [...cursos];

    } else{
        articulosCarrito = [infoCurso,...articulosCarrito];
    }

    // Agregar elementos al carrito
    carritoHTML();
}


// Crear HTML al carrito de comprars
function carritoHTML() {
    limpiarHTML();

    // Recorre todo
    articulosCarrito.forEach(curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src='${imagen}' width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}
// Limpiar HTML 
function limpiarHTML (){
    // Limpiar HTML - Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
// Actualizar LocalStorage
function actualizarLocalStorage () {
    const stringCarrito = JSON.stringify(articulosCarrito);
    localStorage.setItem('carrito',stringCarrito);
    console.log(stringCarrito);
}