import {
    productModel
} from "../dao/models/mongo/product.model.js";

export default class ProductService {


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
}