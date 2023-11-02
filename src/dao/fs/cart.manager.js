// const fs = require("fs")
import * as fs from "fs"

class CartManager {
    path

    constructor() {
        this.path = "./src/carritos.json"
    }

    getAllCarts() {
        if (fs.existsSync(this.path)) {
            const carritos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            return carritos
        } else {
            return {
                error: "No se han registrado carritos"
            }
        }
    }

    nuevoCarrito() {

        const carrito = {
            id: 0,
            products: []
        }

        const carritos = this.getCarritos()
        if (!carritos.error) {
            carrito.id = carritos.length
            if (carrito.id !== 1) {
                carrito.id - 1
            }
            // lo agrego al array de carritos
            carritos.push(carrito)
            // guardo el archivo con los cambios
            fs.writeFileSync(this.path, JSON.stringify(carritos, null, "\t"))

            return {
                succes: `Nuevo carrito creado con id: ${carrito.id}`
            }
        }
        // si el archivo no existe:
        else {
            // creo array de carritos
            const carritos = []
            // agrego el nuevo carrito
            carritos.push(carrito)
            // guardo datos en file
            fs.writeFileSync(this.path, JSON.stringify(carritos, null, "\t"))

            return {
                succes: `El archivo carritos.json ha sido creado y el carrito con id: ${carrito.id} ha sido agregado correctamente`
            }
        }
    }

    getCarritoPorId(id) {
        const carritos = this.getCarritos()
        if (carritos.error) {
            return carritos
        }

        const carritoDeseado = carritos.find((carrito) => carrito.id === id)
        if (carritoDeseado === undefined) {
            return {
                error: "Carrito no encontrado"
            }
        } else {
            return carritoDeseado
        }
    }

    updateCarrito(idCarrito, {
        id
    }) {
        const carritos = this.getCarritos()

        const nuevaListaCarritos = carritos.map((carrito) => {
            // si encuentra el carrito deseado
            if (carrito.id === idCarrito) {
                // chequeo si el producto ya existe en el carrito

                const existeProductoEnCarrito = carrito.products.find((elemento) => elemento.product === id)

                if (existeProductoEnCarrito === undefined) {
                    const nuevoProducto = {
                        product: id,
                        quantity: 1
                    }

                    const carritoActualizado = {
                        id: carrito.id,
                        products: [...carrito.products, nuevoProducto]
                    }
                    return carritoActualizado
                }

                const updateProducts = carrito.products.map((elemento) => {
                    if (elemento.product === id) {
                        const elementoActualizado = {
                            product: id,
                            quantity: elemento.quantity + 1
                        }
                        return elementoActualizado
                    } else {
                        return elemento
                    }
                })

                const carritoActualizado = {
                    id: carrito.id,
                    products: updateProducts
                }

                return carritoActualizado
                // Si no es el carrito deseado lo devuelve como esta
            } else {
                return carrito
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(nuevaListaCarritos, null, "\t"))

        return {
            success: `Carrito con id: ${idCarrito} actualizado. Se agrego una unidad del producto con id: ${id}`
        }
    }

}

export default CartManager