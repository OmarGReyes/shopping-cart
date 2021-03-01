const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregar un curso presionando "Agregar Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Eliminar curso del carrito
  carrito.addEventListener('click', eliminarCurso);

  //vaciar el carro
  vaciarCarrito.addEventListener('click', vaciarProductos)

  //Muestra los cursos del local
  document.addEventListener('DOMContentLoaded', ()=>{
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    carritoHTML(articulosCarrito)
  })
}

//Functions

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatos(cursoSeleccionado);
    
  }
}

function eliminarCurso(e){
  if(e.target.classList.contains("borrar-curso")){
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

    console.log( articulosCarrito)
    carritoHTML(articulosCarrito)
  }
  
}

function vaciarProductos(e){
  articulosCarrito = []
  carritoHTML(articulosCarrito)
  
}

function leerDatos(curso) {
  console.log(curso);
  var cantidad = 0;
  //Crear objeto con contenido del curso actual
  let infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"), // Seleccionar un atributo de una clase/componente
    cantidad: 1,
  };

  if (articulosCarrito.some(articulosCarrito => articulosCarrito.id === infoCurso.id)){
    articulosCarrito.forEach((cursoExist) =>{
      if (cursoExist.id === infoCurso.id){
        cursoExist.cantidad++;
        console.log("Sumemos 1")
      }
    })
    
  } else{
    //agregar elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    
  }
  //console.log(articulosCarrito)
  carritoHTML(articulosCarrito);
}

//Creamos HTML
function carritoHTML(articulosCarrito) {
  const tabla = document.querySelector("tbody");
  console.log(tabla);
  limpiarHTML(tabla)
  articulosCarrito.forEach((curso) => {
    const {imagen,titulo,precio,cantidad,id} = curso; //Using detructure
    const tr = document.createElement("tr");
    const tdImagen = document.createElement("td");
    const Imagen = document.createElement("img");
    Imagen.src = imagen;
    Imagen.width = 100;
    tdImagen.appendChild(Imagen)

    const tdNombre = document.createElement("td");
    tdNombre.textContent = titulo;

    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = precio;

    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = cantidad;

    const tdEliminar = document.createElement("td");
    const aEliminarCurso = document.createElement("a");
    aEliminarCurso.classList.add("borrar-curso")
    aEliminarCurso.textContent="X"
    aEliminarCurso.href= "#"
    aEliminarCurso.setAttribute("data-id",id)
    tdEliminar.appendChild(aEliminarCurso);

    //append to tr
    tr.appendChild(tdImagen);
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdEliminar);

    tabla.appendChild(tr);
  });

  // Agregar el carrito al storage
  sincronizarStorage()
}

function sincronizarStorage(){
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Limpiar HTML

function limpiarHTML(tabla) {
    //Forma lenta
    //tabla.innerHTML = ""

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
