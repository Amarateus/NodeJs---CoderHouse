import {
    cartModel
} from "../dao/models/mongo/cart.model.js";

export default class CartRepository {
    // traer todos los carritos
    async getAllCarts () {
        const carts = await cartModel.find().lean()
        return carts
    }

    // crear un nuevo carrito
    async nuevoCarrito(cart) {
        const nuevoCarrito = await cartModel.create(cart)
        return nuevoCarrito
    }

    // traer carrito por su id
    async getCarritoPorId(cartId) {
        try {
            const cart = await cartModel.findOne({
                _id: cartId
            }).populate('products.product').lean()

            return cart

        } catch {
            return {
                error: `El carrito con id ${cartId} no existe`
            }
        }
    }

    // actualizar los products del carrito
    async updateCartProducts(cartId, products) {
        const updateCart = await cartModel.updateOne({
            _id: cartId
        }, {
            products: products
        })

        return updateCart
    }

    async deleteCart(cartId) {
        const deletedCart = await cartModel.deleteOne({
            _id: cartId
        })

        return deletedCart
    }
}