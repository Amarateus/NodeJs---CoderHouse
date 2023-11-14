import {
    Router
} from "express";
import CartController from "../controllers/cart.controller.js";

// instancio la clase
const cartController = new CartController()

// instancio Router
const router = Router()

// traer todos los carritos
router.get("/", async (req, res) => {
    const carts = await cartController.getAllCarts()
    res.status(200).send(carts)
})

// crear un nuevo carrito
router.post("/", async (req, res) => {
    const respuesta = await cartController.nuevoCarrito()
    res.status(201).send(respuesta)
})

// traer un carrito por su id
router.get("/:cid", async (req, res) => {
    const idCarrito = req.params.cid
    const respuesta = await cartController.getCarritoPorId(idCarrito)

    if (respuesta.error) {
        res.status(404).send(respuesta)
    } else {
        res.render('cart', {
            respuesta
        })
    }
})

// agregar un producto al carrito
// si ya existe en el carrito, le suma 1 a quantity
router.post("/:cid/product/:pid", async (req, res) => {
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartController.updateCarrito(idCarrito, idProducto)

    res.status(201).send(respuesta)
})

// eliminar un producto del carrito deseado
router.delete("/:cid/product/:pid", async (req, res) => {
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartController.deleteCartProduct(idCarrito, idProducto)

    res.status(201).send(respuesta)
})

// actualizar los products del carrito
router.put("/:cid", async (req, res) => {
    const newProducts = req.body
    const idCarrito = req.params.cid

    const respuesta = await cartController.updateCartProducts(idCarrito, newProducts)

    res.status(201).send(respuesta)
})

// actualizar el quantity de algun producto guardado en un carrito
router.put("/:cid/product/:pid", async (req, res) => {
    const newQuantity = req.body
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartController.updateProductQuantity(newQuantity, idCarrito, idProducto)

    res.status(201).send(respuesta)
})

// eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    const idCarrito = req.params.cid

    const respuesta = await cartController.deleteCartProducts(idCarrito)

    res.status(201).send(respuesta)
})

// eliminar un carrito
router.delete("/deleteCart/:cid", async (req, res) => {
    const idCarrito = req.params.cid

    const respuesta = await cartController.deleteCart(idCarrito)

    res.status(201).send(respuesta)
})

router.get("/:cid/purchase", async (req, res) => {
    const cartId = req.params.cid
    const user = req.session.email

    const finalCompra = await cartController.finalCompra(cartId, user)

    res.send(finalCompra)
})


export default router