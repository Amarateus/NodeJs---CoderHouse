import {
    Router
} from "express";
import CartManager from "../controllers/cart.manager.js";

// instancio la clase
const cartManager = new CartManager()

// instancio Router
const router = Router()

// traer todos los carritos
router.get("/", async (req, res) => {
    const carts = await cartManager.getAllCarts()
    res.status(200).send(carts)
})

// crear un nuevo carrito
router.post("/", async (req, res) => {
    const respuesta = await cartManager.nuevoCarrito()
    res.status(201).send(respuesta)
})

// traer un carrito por su id
router.get("/:cid", async (req, res) => {
    const idCarrito = req.params.cid
    const respuesta = await cartManager.getCarritoPorId(idCarrito)
    if (respuesta.error) {
        res.status(404).send(respuesta)
    } else {
        res.render('cart', {respuesta})
    }
})

// agregar un producto al carrito
// si ya existe en el carrito, le suma 1 a quantity
router.post("/:cid/product/:pid", async (req, res) => {
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartManager.updateCarrito(idCarrito, idProducto)

    res.status(201).send(respuesta)
})

// eliminar un producto del carrito deseado
router.delete("/:cid/product/:pid", async (req, res) => {
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartManager.deleteCartProduct(idCarrito, idProducto)

    res.status(201).send(respuesta)
})

// actualizar los products del carrito
router.put("/:cid", async (req, res) => {
    const newProducts = req.body
    const idCarrito = req.params.cid

    const respuesta = await cartManager.updateCartProducts(idCarrito, newProducts)

    res.status(201).send(respuesta)
})

// actualizar el quantity de algun producto guardado en un carrito
router.put("/:cid/product/:pid", async (req, res) => {
    const newQuantity = req.body
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartManager.updateProductQuantity(newQuantity, idCarrito, idProducto)

    res.status(201).send(respuesta)
})

// eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    const idCarrito = req.params.cid

    const respuesta = await cartManager.deleteCartProducts(idCarrito)

    res.status(201).send(respuesta)
})

// eliminar un carrito
router.delete("/deleteCart/:cid", async (req, res) => {
    const idCarrito = req.params.cid

    const respuesta = await cartManager.deleteCart(idCarrito)

    res.status(201).send(respuesta)
})


export default router