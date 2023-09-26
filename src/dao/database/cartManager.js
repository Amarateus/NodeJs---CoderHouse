import {
    cartModel
} from "../models/cart.model.js";

export default class CartManager {
    async getAllCarts() {
        const carts = await cartModel.find().lean()
        return carts
    }

    async nuevoCarrito(cart) {
        const nuevoCarrito = await cartModel.create(cart)
        return `Nuevo carrito creado con id: ${nuevoCarrito.id}`
    }

    async getCarritoPorId(id) {
        const cart = await cartModel.findOne({
            _id: id
        }).lean()
        return cart
    }

    async updateCarrito(idCart, idProduct) {
        const cart = await cartModel.find({
            _id: idCart
        })
        const cartProducts = cart[0].products

        const productExist = cartProducts.find((product) => product.product === idProduct)

        if (productExist === undefined) {
            const newProduct = {
                product: idProduct,
                quantity: 1
            }
            cartProducts.push(newProduct)

            const updateCart = await cartModel.updateOne({
                _id: idCart
            }, {
                products: cartProducts
            })

            return updateCart
        }

        productExist.quantity++

        const updateCart = await cartModel.updateOne({
            _id: idCart
        }, {
            products: cartProducts
        })

        return updateCart
    }


}