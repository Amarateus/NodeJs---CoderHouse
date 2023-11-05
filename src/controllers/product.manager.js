import {
    productModel
} from "../dao/models/mongo/product.model.js";
import ProductService from "../services/product.service.js";

const productService = new ProductService()

export default class ProductManager {
    // traer todos los productos
    async getProducts(limit, page, query, sort) {

        let objQuery = query
        if (typeof (query) === "string") {
            objQuery = JSON.parse(query)
        }

        const pag = await productService.getProducts(objQuery, page, limit, sort)

        const queryString = JSON.stringify(objQuery)

        const devolucion = {
            status: pag.docs.length > 0 ? "Succes" : "Error",
            payload: pag.docs,
            prevPage: pag.prevPage,
            nextPage: pag.nextPage,
            page: page,
            hasPrevPage: pag.hasPrevPage,
            hasNextPage: pag.hasNextPage,
            prevLink: pag.hasPrevPage ? `http://localhost:8080/api/products?page=${pag.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
            nextLink: pag.hasNextPage ? `http://localhost:8080/api/products?page=${pag.nextPage}&limit=${limit}&sort=${sort}&query=${queryString}` : null,
        }

        return devolucion
    }

    // agregar un producto a la BD
    async addProduct(title, category, description, price, code, stock, thumbnail = "img", status = true) {

        if (!title || !category || !description || !price || !code || !stock) {
            return {
                error: "Faltan completar campos del producto"
            }
        }

        // corroboro que el producto no este registrado aun
        const productExist = await productService.getProductByCode(code)

        if (productExist.length === 1) {
            return {
                error: "El producto ya esta registrado"
            }
        }

        const newProduct = await productService.createProduct(
            title,
            category,
            description,
            price,
            code,
            stock,
            thumbnail,
            status
        )

        return newProduct
    }

    // traer un producto por su id
    async getProductById(id) {
        const respuesta = await productService.getProductById(id)
        return respuesta
    }

    // actualizar un producto
    async updateProduct(id, newProduct) {
        try {
            const update = await productService.updateProduct(id, newProduct)

            return update
        } catch {
            return {
                error: `El producto con id: ${id} no fue encontrado`
            }
        }
    }

    async deleteProductById(id) {
        try {
            const deleteProduct = await productService.deleteProduct(id)

            return deleteProduct
        } catch {
            return {
                error: `El producto con id: ${id} no existe`
            }
        }
    }
}