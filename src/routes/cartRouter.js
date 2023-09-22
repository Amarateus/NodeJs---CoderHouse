import {
    Router
} from "express";
import CartManager from "../dao/database/cartManager.js";

// instancio la clase
const cartManager = new CartManager()

// instancio Router
const router = Router()

// endpoint para conseguir todos los carritos
router.get("/", async (req, res)=>{
    const carts = await cartManager.getAllCarts()
    res.status(200).send(carts)
})

// endpoint para crear un nuevo
router.post("/", async (req, res) => {
    const respuesta = await cartManager.nuevoCarrito()
    res.status(201).send(respuesta)
})


// endpoint para traer un carrito por su id
router.get("/:cid", async (req, res) => {
    const idCarrito = req.params.cid
    const respuesta = await cartManager.getCarritoPorId(idCarrito)

    if (respuesta.error){
        res.status(404).send(respuesta)
    }

    res.status(200).send(respuesta)
})

router.post("/:cid/product/:pid", async (req, res)=>{
    const idCarrito = req.params.cid
    const idProducto = req.params.pid

    const respuesta = await cartManager.updateCarrito(idCarrito, idProducto)

    res.status(201).send(respuesta)
})

export default router