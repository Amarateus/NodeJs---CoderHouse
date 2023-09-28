import { deleteModel } from "mongoose";
import {
    cartModel
} from "../models/cart.model.js";
import ProductManager from "./productManager.js"

const productManager = new ProductManager()

export default class CartManager {
    // traer todos los carritos
    async getAllCarts() {
        const carts = await cartModel.find().lean()
        return carts
    }

    // crear un nuevo carrito
    async nuevoCarrito(cart) {
        const nuevoCarrito = await cartModel.create(cart)
        return `Nuevo carrito creado con id: ${nuevoCarrito.id}`
    }

    // traer carrito por su id
    async getCarritoPorId(id) {
        try {
            const cart = await cartModel.findOne({
                _id: id
            }).populate('products.product').lean()

            return cart

        } catch {
            return {
                error: `El carrito con id ${id} no existe`
            }
        }
    }

    // agregar un producto al carrito
    // si ya existe, aumentar su cantidad
    async updateCarrito(idCart, idProduct) {

        // el producto existe en la bd?
        const existeProducto = await productManager.getProductById(idProduct)
        if (existeProducto.error) {
            return existeProducto
        }

        // el cart existe en la bd?
        const cartExist = await this.getCarritoPorId(idCart)
        if (cartExist.error) {
            return cartExist
        }

        const cartProducts = cartExist.products

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

    // elimiar un producto del carrito deseado
    async deleteCartProduct(idCart, idProduct) {
        // el producto existe en la bd?
        const existeProducto = await productManager.getProductById(idProduct)
        if (existeProducto.error) {
            return existeProducto
        }

        // el cart existe en la bd?
        const cartExist = await this.getCarritoPorId(idCart)
        if (cartExist.error) {
            return cartExist
        }

        const cartProducts = cartExist.products

        const newProductsList = cartProducts.filter((product) => product.product != idProduct)

        const updateCart = await cartModel.updateOne({
            _id: idCart
        }, {
            products: newProductsList
        })

        return updateCart
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

    // actualizar el quantity de algun producto guardado en un carrito
    async updateProductQuantity(newQuantity, cartId, prodId) {
        // el cart existe en la bd?
        const cartExist = await this.getCarritoPorId(cartId)
        if (cartExist.error) {
            return cartExist
        }

        const cartProducts = cartExist.products

        const productExist = cartProducts.find((product) => product.product === prodId)

        if (productExist === undefined) {
            return {
                error: `El producto con id: ${prodId} no se encuentra agregado al carrito`
            }
        }

        const newProductsQuantity = cartProducts.map((product)=>{
            if (product.product === prodId){
                return {
                    product: prodId,
                    quantity: newQuantity.quantity
                }
            } else {
                return product
            }
        })

        const updateCart = await cartModel.updateOne({
            _id: cartId
        }, {
            products: newProductsQuantity
        })

        return updateCart

    }

    // eliminar los productos de un carrito
    async deleteCartProducts(cartId) {
        // el cart existe en la bd?
        const cartExist = await this.getCarritoPorId(cartId)
        if (cartExist.error) {
            return cartExist
        }

        const newCart = await cartModel.updateOne({
            _id: cartId
        },{
            products: []
        })

        return newCart
    }

    // eliminar un carrito
    async deleteCart(cartId) {
        try {
            const deletedCart = await cartModel.deleteOne({_id: cartId})
            return deletedCart
        } catch {
            return {error: "El carrito que desea eliminar no existe"}
        }
    }




}