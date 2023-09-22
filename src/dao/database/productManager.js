import {
    productModel
} from "../models/product.model.js";

export default class ProductManager {
    // traer todos los productos
    async getProducts() {
        const products = productModel.find().lean()
        return products
    }

    // agregar un producto a la BD
    async addProduct(title, category, description, price, code, stock, thumbnail = "img", status = true) {

        if (!title || !category || !description || !price || !code || !stock) {
            return {
                error: "Faltan completar campos del producto"
            }
        }

        // corroboro que el producto no este registrado aun
        const productExist = await productModel.find({code: code})
        console.log(productExist)

        if (productExist.length === 1) {
            return {
                Error: "El producto ya esta registrado"
            }
        }

        const newProduct = productModel.create({
            title,
            category,
            description,
            price,
            code,
            stock,
            thumbnail,
            status
        })
        return newProduct
    }

    // traer un producto por su id
    async getProductById(id) {
        const product = await productModel.findOne({_id: id}).lean()
        
        return product
    }

    // actualizar un producto
    async updateProduct(id, newProduct) {
        const update = productModel.updateOne({_id: id}, newProduct)

        return update
    }

    async deleteProductById (id) {
        const deleteProduct = productModel.deleteOne({_id: id})

        return deleteProduct
    }
}