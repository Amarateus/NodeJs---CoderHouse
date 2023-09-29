// const button = document.getElementById("addCart")
// console.log(botones)
// const prodId = document.getElementById("id").textContent

const botones = document.getElementsByClassName("boton")
const ids = document.getElementsByClassName("id")
console.log(botones[0].innerHTML)
console.log(ids[0].innerHTML)

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

// button.addEventListener("click", async () => {
//     fetch(`http://localhost:8080/api/carts/6516fa112bfd37ed9a8d4267/product/${prodId}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Producto agregado al carrito',
//         showConfirmButton: false,
//         timer: 1500
//     })
// })