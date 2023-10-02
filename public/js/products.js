const botones = document.getElementsByClassName("boton")
const ids = document.getElementsByClassName("id")

const crear_evento = (boton, id) => {
    boton.onclick = async () => {
        fetch(`http://localhost:8080/api/carts/6516fa112bfd37ed9a8d4267/product/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

for (let i = 0; i < botones.length; i++) {
    crear_evento(botones[i], ids[i].innerHTML);
}