// const fs = require("fs")
import * as fs from "fs"

class ProductManager {
    path

    constructor() {
        this.path = "./src/productos.json"
    }

    addProduct(title, category, description, price, code, stock, thumbnail = "img", status = true) {
        
        if (!title || !category || !description || !price || !code || !stock ) {
            return {error: "Faltan completar campos del producto"}
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
            // trae el contenido
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            // parsea el contenido listas y objetos
            const contentObj = JSON.parse(fileContent);
            product.id = contentObj.length
            if (product.id !== 1) {
                product.id - 1
            }
            // corroboro si el producto ya existe
            if (contentObj.find((element) => element.code === product.code)) {
                return {error: "El producto ya existe"}
            }
            // si no existe, lo agrego
            contentObj.push(product)
            // guardo el archivo con los cambios
            fs.writeFileSync(this.path, JSON.stringify(contentObj, null, "\t"))
            
            return {succes: `${product.title} ha sido agregado correctamente`}
            // si el archivo no existe:
        } else {
            const products = []
            products.push(product)
            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
            return {succes: `El archivo productos.json ha sido creado y el producto ${product.title} ha sido agregado correctamente`}
        }
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const products = fs.readFileSync(this.path)
            return JSON.parse(products)
        } else {
            return "No se han registrado productos"
        }

    }

    getProductById(id) {

        if (fs.existsSync(this.path)) {
            const products = fs.readFileSync(this.path)
            const productsObj = JSON.parse(products)
            const wantedProduct = productsObj.find((element) => element.id === id)
            if (wantedProduct === undefined) {
                return "Producto no encontrado"
            } else {
                return wantedProduct
            }

        } else {
            return "Archivo no encontrado"
        }
    }

    deleteProductById(id) {
        const products = fs.readFileSync(this.path)
        const productsObj = JSON.parse(products)
        if (!productsObj.find((element) => element.id === id)) {
            return console.log("El id ingresado para eliminar no correcponde a ningun producto")
        }

        const newList = productsObj.filter((elemento) => elemento.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(newList, null, "\t"))
        console.log(newList)
        return console.log(`Producto con id: ${id} eliminado`)
    }

    updateProduct(id, newProduct) {
        const products = fs.readFileSync(this.path)
        const productsObj = JSON.parse(products)
        const wantedProduct = productsObj.map((element) => {
            if (element.id !== id) {
                return element
            } else {
                element = {
                    id: id,
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    thumbnail: newProduct.thumbnail,
                    code: newProduct.code,
                    stock: newProduct.stock
                }
                console.log(element)
                return element
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(wantedProduct, null, "\t"))

        return console.log(`Producto con id: ${id} actualizado`)
    }

}

export default ProductManager

// console.log("\n\nAgrego productos")
// productManager.addProduct("Manzana", "Fruta de arbol", 150, "img", 1, 30)
// productManager.addProduct("Pera", "Fruta de arbol", 100, "img", 2, 10)
// productManager.addProduct("Banana", "Fruta de arbol", 170, "img", 3, 15)
// productManager.addProduct("Sandia", "Fruta grande", 370, "img", 4, 7)
// productManager.addProduct("Kiwi", "Fruta acida", 230, "img", 5, 18)
// productManager.addProduct("Durazno", "Fruta con cascara", 300, "img", 6, 17)