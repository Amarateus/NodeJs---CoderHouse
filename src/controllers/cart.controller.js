import ProductController from "./product.controller.js"
import CartRepository from "../repositories/cart.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";

const productController = new ProductController()
const cartRepository = new CartRepository()
const ticketRepository = new TicketRepository()

export default class CartController {
    // traer todos los carritos
    async getAllCarts() {
        const carts = await cartRepository.getAllCarts()
        return carts
    }

    // crear un nuevo carrito
    async nuevoCarrito(cart) {
        const nuevoCarrito = await cartRepository.nuevoCarrito(cart)
        return `Nuevo carrito creado con id: ${nuevoCarrito.id}`
    }

    // traer carrito por su id
    async getCarritoPorId(id) {
        const respuesta = await cartRepository.getCarritoPorId(id)

        return respuesta
    }

    // agregar un producto al carrito
    // si ya existe, aumentar su cantidad
    async updateCarrito(idCart, idProduct) {

        // el producto existe en la bd?
        const existeProducto = await productController.getProductById(idProduct)
        if (existeProducto.error) {
            return existeProducto
        }

        // el cart existe en la bd?
        const cartExist = await this.getCarritoPorId(idCart)
        if (cartExist.error) {
            return cartExist
        }

        const cartProducts = cartExist.products

        const producto = await productController.getProductById(idProduct)

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
        const existeProducto = await productController.getProductById(idProduct)
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

        const updateCart = await cartRepository.updateCartProducts(idCart, newProductsList)

        return updateCart
    }

    // actualizar los products del carrito
    async updateCartProducts(cartId, products) {
        const respuesta = await cartRepository.updateCartProducts(cartId, products)

        return respuesta
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

        const newProductsQuantity = cartProducts.map((product) => {
            if (product.product === prodId) {
                return {
                    product: prodId,
                    quantity: newQuantity.quantity
                }
            } else {
                return product
            }
        })

        const updateCart = await cartRepository.updateCartProducts(cartId, newProductsQuantity)

        return updateCart

    }

    // eliminar los productos de un carrito
    async deleteCartProducts(cartId) {
        // el cart existe en la bd?
        const cartExist = await this.getCarritoPorId(cartId)
        if (cartExist.error) {
            return cartExist
        }

        const newCart = await cartRepository.updateCartProducts(cartId, [])

        return newCart
    }

    // eliminar un carrito
    async deleteCart(cartId) {
        try {
            const deletedCart = await cartRepository.deleteCart(cartId)
            return deletedCart
        } catch {
            return {
                error: "El carrito que desea eliminar no existe"
            }
        }
    }

    async finalCompra(cartId, user) {
        const cart = await this.getCarritoPorId(cartId)
        if (cart.error) {
            return cart
        }

        const cartProducts = cart.products

        const productsWithStock = cartProducts.filter((producto) =>
            producto.quantity < producto.product.stock || producto.quantity === producto.product.stock)

        const productsWithOutStock = cartProducts.filter((producto) =>
            producto.quantity > producto.product.stock)

        // resto el stock comprado de la BD de products
        if (productsWithStock.length > 0) {
            const stockUpdate = productsWithStock.forEach(async (product) => {
                const stock = product.product.stock - product.quantity
                const respuesta = await productController.updateProduct(product.product._id, {
                    stock: stock
                })
            })

            const amount = productsWithStock.reduce((acc, product) => acc + product.product.price * product.quantity, 0)

            const purchaseDTO ={
                amount: amount,
                purchaser: user
            }
            // realizo la compra
            const newPurchase = await ticketRepository.newTicket(purchaseDTO)


        }

        if (productsWithOutStock.length > 0) {
            const productsWithOutStockDTO = productsWithOutStock.map((producto) => {
                return {
                    id: producto.product._id,
                    title: producto.product.title
                }
            })
            // dejo el cart del usario con los productos que no pudo comprar
            const cartUpdate = await this.updateCartProducts(cartId, productsWithOutStock)

            return {
                "No se pudieron comprar los siguientes productos": productsWithOutStockDTO
            }
        }

        // si se pudieron comprar todos los productos vaciamos el cart
        const cartUpdate = await this.updateCartProducts(cartId, [])
        return {status: "Success", message: "Se compraron todos los productos"}

    }



}