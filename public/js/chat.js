const socket = io()

let correoUsuario = ''

Swal.fire({
    title: 'Ingresa tu correo',
    input: 'text',
    confirmButtonText: 'Empezar a chatear',
}).then((result) => {
    correoUsuario = result.value;
});

const caja = document.getElementById("caja")
const contenido = document.getElementById("contenido") 


caja.addEventListener('change', (e) => {
    socket.emit('mensaje', {
        user: correoUsuario,
        message: e.target.value,
    });
});

socket.on("nuevoMensaje", (data)=>{
    const mensajes = data.map(({user, message})=>{
        return `<p>${user} dijo: ${message}</p>`
    })

    contenido.innerHTML = mensajes.join('')
})

