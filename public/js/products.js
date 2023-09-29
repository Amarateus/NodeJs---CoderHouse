const button = document.getElementById("addCart")
console.log(botones)
const prodId = document.getElementById("id").textContent

button.addEventListener("click", async () => {
    fetch(`http://localhost:8080/api/carts/6516fa112bfd37ed9a8d4267/product/${prodId}`, {
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
})