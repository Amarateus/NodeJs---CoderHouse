import {
    Router
} from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const cartManager = new CartManager()
const productManager = new ProductManager()

const router = Router()

router.post("/", (req, res) => {
    const respuesta = cartManager.nuevoCarrito()
    res.status(201).send(respuesta)
})

router.get("/:cid", (req, res) => {
    const idCarrito = parseInt(req.params.cid, 10)
    const respuesta = cartManager.getCarritoPorId(idCarrito)

    if (respuesta.error){
        res.status(404).send(respuesta)
    }

    res.status(200).send(respuesta)
})

router.post("/:cid/product/:pid", (req, res)=>{
    const idCarrito = parseInt(req.params.cid, 10)
    const idProducto = parseInt(req.params.pid, 10)

    const productoDeseado = productManager.getProductById(idProducto)
    if (productoDeseado.error){
        res.status(400).send(productoDeseado)
    }

    const carritoDeseado = cartManager.getCarritoPorId(idCarrito)
    if (carritoDeseado.error){
        res.status(400).send(carritoDeseado)
    }

    const respuesta = cartManager.updateCarrito(idCarrito, productoDeseado)

    res.status(201).send(respuesta)
})



export default router