import {
    Router
} from "express";
import ProductManager from "../dao/database/productManager.js"

const productManager = new ProductManager()

const router = Router()

// Rutas
router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
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

router.get("/:pid", async (req, res) => {
    const productId = req.params.pid
    const respuesta = await productManager.getProductById(productId)
    res.send(respuesta)
})

router.post("/", async (req, res) => {
    const {
        title,
        category,
        description,
        price,
        code,
        stock
    } = req.body
    const respuesta = await productManager.addProduct(title, category, description, price, code, stock)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    }

    res.status(201).send(respuesta)
})

router.put("/:pid", async(req, res) => {
    const productId = req.params.pid
    const newProduct = req.body
    const respuesta = await productManager.updateProduct(productId, newProduct)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    }

    res.send(respuesta)
})

router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid
    const respuesta = await productManager.deleteProductById(productId)
    
    res.send(respuesta)
})

// export router
export default router