// const fs = require("fs")
import * as fs from "fs"

class ProductManager {
    path
    static id = 0

    constructor() {
        this.path = "./src/productos.json"
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const product = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        ProductManager.id++


        if (fs.existsSync(this.path)){

            const fileContent = fs.readFileSync(this.path, 'utf-8');

            const contentObj = JSON.parse(fileContent);

            if (contentObj.find((element)=>element.id === product.id)){
                return console.log("El producto ya existe")
            }

            contentObj.push(product)

            fs.writeFileSync(this.path, JSON.stringify(contentObj, null, "\t"))   

            return console.log(`${product.title} ha sido agregado correctamente`)

        } else {
            const products = []
            products.push(product)
            fs.writeFileSync(this.path, JSON.stringify(products))
            return console.log(`${product.title} ha sido agregado correctamente`)
        }
    }

    getProducts() {
        if (fs.existsSync(this.path)){
            const products = fs.readFileSync(this.path)
            return JSON.parse(products)
        } else {
            return "No se han registrado productos"
        }
        
    }

    getProductById(id) {

        if (fs.existsSync(this.path)){
            const products = fs.readFileSync(this.path)
            const productsObj = JSON.parse(products)
            const wantedProduct = productsObj.find((element)=> element.id === id)
            if (wantedProduct === undefined) {
                return "Producto no encontrado"
            } else {
                return wantedProduct
            }
            
        } else {
            return "Archivo no encontrado"
        }
    }

    deleteProductById(id){  
        const products = fs.readFileSync(this.path)
        const productsObj = JSON.parse(products)
        if (!productsObj.find((element)=> element.id === id)){
            return console.log("El id ingresado para eliminar no correcponde a ningun producto")
        }

        const newList = productsObj.filter((elemento)=> elemento.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(newList, null, "\t"))
        console.log(newList)
        return console.log(`Producto con id: ${id} eliminado`)
    }

    updateProduct(id, newProduct){
        const products = fs.readFileSync(this.path)
        const productsObj = JSON.parse(products)
        const wantedProduct = productsObj.map((element)=> {
            if (element.id !== id){
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


// console.log("\n\nInstancio la clase")
//  const productManager = new ProductManager()
//  console.log(productManager.getProducts())

// console.log("\n\nAgrego productos")
// productManager.addProduct("Manzana", "Fruta de arbol", 150, "img", 1, 30)
// productManager.addProduct("Pera", "Fruta de arbol", 100, "img", 2, 10)
// productManager.addProduct("Banana", "Fruta de arbol", 170, "img", 3, 15)
// productManager.addProduct("Sandia", "Fruta grande", 370, "img", 4, 7)
// productManager.addProduct("Kiwi", "Fruta acida", 230, "img", 5, 18)
// productManager.addProduct("Durazno", "Fruta con cascara", 300, "img", 6, 17)


