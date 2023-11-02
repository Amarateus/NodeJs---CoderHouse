import ProductManager from "../controllers/product.manager.js"
import CartService from "../services/cart.service.js";
import { cartModel } from "../dao/models/mongo/cart.model.js";

const productManager = new ProductManager()
const cartService = new CartService()

export default class CartManager {
    // traer todos los carritos
    async getAllCarts() {
        const carts = await cartService.getAllCarts()
        return carts
    }

    // crear un nuevo carrito
    async nuevoCarrito(cart) {
        const nuevoCarrito = await cartService.nuevoCarrito(cart)
        return `Nuevo carrito creado con id: ${nuevoCarrito.id}`
    }

    // traer carrito por su id
    async getCarritoPorId(id) {
        const respuesta = await cartService.getCarritoPorId(id)
        return respuesta
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

        const producto = await productManager.getProductById(idProduct)

        const productExist = cartProducts.find((product) => product.product.code === producto.code)

        if (productExist === undefined) {
            const newProduct = {
                product: idProduct,
                quantity: 1
            }
            cartProducts.push(newProduct)

            const updateCart = await this.updateCartProducts(idCart, cartProducts)

            return updateCart
        }

        productExist.quantity++

        const updateCart = await this.updateCartProducts(idCart, cartProducts)

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

        const newProductsList = cartProducts.filter((product) => product.product._id != idProduct)

        const updateCart = await cartService.updateCartProducts(idCart, newProductsList)

        return updateCart
    }

    // actualizar los products del carrito
    async updateCartProducts(cartId, products) {
        const respuesta = await cartService.updateCartProducts(cartId, products)

        return respuesta
    }


//     // actualizar el quantity de algun producto guardado en un carrito
//     async updateProductQuantity(newQuantity, cartId, prodId) {
//         // el cart existe en la bd?
//         const cartExist = await this.getCarritoPorId(cartId)
//         if (cartExist.error) {
//             return cartExist
//         }

//         const cartProducts = cartExist.products

//         const productExist = cartProducts.find((product) => product.product === prodId)

//         if (productExist === undefined) {
//             return {
//                 error: `El producto con id: ${prodId} no se encuentra agregado al carrito`
//             }
//         }

//         const newProductsQuantity = cartProducts.map((product) => {
//             if (product.product === prodId) {
//                 return {
//                     product: prodId,
//                     quantity: newQuantity.quantity
//                 }
//             } else {
//                 return product
//             }
//         })

//         const updateCart = await cartModel.updateOne({
//             _id: cartId
//         }, {
//             products: newProductsQuantity
//         })

//         return updateCart

//     }

//     // eliminar los productos de un carrito
//     async deleteCartProducts(cartId) {
//         // el cart existe en la bd?
//         const cartExist = await this.getCarritoPorId(cartId)
//         if (cartExist.error) {
//             return cartExist
//         }

//         const newCart = await cartModel.updateOne({
//             _id: cartId
//         }, {
//             products: []
//         })

//         return newCart
//     }

//     // eliminar un carrito
//     async deleteCart(cartId) {
//         try {
//             const deletedCart = await cartModel.deleteOne({
//                 _id: cartId
//             })
//             return deletedCart
//         } catch {
//             return {
//                 error: "El carrito que desea eliminar no existe"
//             }
//         }
//     }




}