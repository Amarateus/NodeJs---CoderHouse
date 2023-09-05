const socket = io()

const productos = document.getElementById("productos")

socket.on('productosActualizados', ({productosActualizados})=>{
    productos.innerHTML = `
    <ul>
    {{#each productosActualizados}}
      <li>
        {{this.title}}
      </li>
    {{/each}}
    </ul>`
})