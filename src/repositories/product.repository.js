import {
    productModel
} from "../dao/models/mongo/product.model.js";

export default class ProductRepository {

    async getProducts(objQuery, page, limit, sort) {
        const pag = await productModel.paginate(objQuery, {
            page: page,
            limit: limit,
            sort: {
                price: sort
            },
            lean: true
        })
        return pag
    }

    async getProductById(id) {
        try {
            const product = await productModel.findOne({
                _id: id
            }).lean()

            return product
        } catch {
            return {
                error: `No se hayo el producto con id: ${id}`
            }
        }
    }

    async getProductByCode (code) {
        const productExist = await productModel.find({
            code: code
        })
        return productExist
    }

    async createProduct(title, category, description, price, code, stock, thumbnail, status) {
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

    async updateProduct(id, newProduct) {
        const update = await productModel.updateOne({
            _id: id
        }, newProduct)

        return update
    }

    async deleteProduct(id) {
        const deleteProduct = await productModel.deleteOne({
            _id: id
        })
        return deleteProduct
    }
}