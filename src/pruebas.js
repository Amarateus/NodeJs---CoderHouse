async function productos() {
    const response = await fetch("./productos.json")
    const respuesta = await response.json()
    console.log(respuesta)
}

productos()
