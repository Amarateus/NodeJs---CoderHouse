// const fs = require("fs")
import * as fs from "fs"

class ProductManager {
    path

    constructor() {
        this.path = "./src/productos.json"
    }

    addProduct(title, category, description, price, code, stock, thumbnail = "img", status = true) {

        if (!title || !category || !description || !price || !code || !stock) {
            return {
                error: "Faltan completar campos del producto"
            }
        }

        const product = {
            id: 0,
            title,
            category,
            description,
            price,
            code,
            stock,
            thumbnail,
            status
        }

        // corrobora que exista el archivo
        if (fs.existsSync(this.path)) {
            // trae el contenido y parsea el contenido listas y objetos
            const fileContent = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            // asigno el id incrementando en 1 en relacion al id del ultimo elemento del array
            product.id = fileContent[fileContent.length - 1].id + 1

            // corroboro si el producto ya existe
            if (fileContent.find((element) => element.code === product.code)) {
                return {
                    error: "El producto ya existe"
                }
            }
            // si no existe, lo agrego
            fileContent.push(product)
            // guardo el archivo con los cambios
            fs.writeFileSync(this.path, JSON.stringify(fileContent, null, "\t"))

            return {
                succes: `${product.title} ha sido agregado correctamente`
            }
            // si el archivo no existe:
        } else {
            const products = []
            products.push(product)
            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
            return {
                succes: `El archivo productos.json ha sido creado y el producto ${product.title} ha sido agregado correctamente`
            }
        }
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const products = fs.readFileSync(this.path)
            return JSON.parse(products)
        } else {
            return {
                error: "No se han registrado productos"
            }
        }

    }

    getProductById(id) {
        const products = this.getProducts()
        if (products.error) {
            return products
        }

        const wantedProduct = products.find((element) => element.id === id)
        if (wantedProduct === undefined) {
            return {
                error: "Producto no encontrado"
            }
        } else {
            return wantedProduct
        }
    }

    deleteProductById(id) {
        const products = this.getProducts()
        if (products.error) {
            return products
        }

        if (!products.find((element) => element.id === id)) {
            return {
                error: "El id ingresado para eliminar no correcponde a ningun producto"
            }
        }

        const newList = products.filter((elemento) => elemento.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(newList, null, "\t"))

        return {
            success: `Producto con id: ${id} eliminado`
        }
    }

    updateProduct(id, newProduct) {
        const products = this.getProducts()
        if (products.error) {
            return products
        }

        const wantedProduct = products.find((element) => element.id === id)
        if (wantedProduct === undefined) {
            return {
                error: "Producto no encontrado"
            }
        }

        const nuevaLista = products.map((element) => {
            if (element.id !== id) {
                return element
            } else {
                element = {
                    ...element,
                    ...newProduct
                }

                return element
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(nuevaLista, null, "\t"))

        return {
            success: `Producto con id: ${id} actualizado`
        }
    }

}

export default ProductManager