import {
    Router
} from "express";
import ProductManager from "../productManager.js"

const productManager = new ProductManager()

const router = Router()

// Rutas
router.get("/", (req, res) => {
    const products = productManager.getProducts()
    const limit = parseInt(req.query.limit, 10)
    if (limit) {
        const limitList = []
        for (let i = 0; i < limit && i < products.length; i++) {
            limitList.push(products[i])
        }
        return res.send(limitList)
    }
    res.send(products)
})

router.get("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid, 10)
    const respuesta = productManager.getProductById(productId)
    res.send(respuesta)
})

router.post("/", (req, res) => {
    const {
        title,
        category,
        description,
        price,
        code,
        stock
    } = req.body
    const respuesta = productManager.addProduct(title, category, description, price, code, stock)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    }

    req.context.socketServer.emit('nuevoProducto', {mensaje: "Se añadio un producto"})
    res.status(201).send(respuesta)
})

router.put("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid, 10)
    const newProduct = req.body
    const respuesta = productManager.updateProduct(productId, newProduct)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    }
    res.send(respuesta)
})

router.delete("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid, 10)
    const respuesta = productManager.deleteProductById(productId)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    }
    res.send(respuesta)
})

// export router
export default router