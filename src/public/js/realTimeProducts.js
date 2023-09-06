const socket = io()

const contenedor = document.getElementById("contenedor")

socket.on('productos', (productos) => {
  const titleProductos = productos.map((producto) => producto.title)
  
  contenedor.innerHTML = titleProductos.join('<br>');
})