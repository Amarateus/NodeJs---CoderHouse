import {
    Router
} from "express";
import ProductManager from "../productManager.js"

// Instancio la clase
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
    const selectedProduct = productManager.getProductById(productId)
    res.send(selectedProduct)
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

    if (respuesta.error){
        return res.status(400).send(respuesta)
    }

    res.status(201).send(respuesta)
})

// export router
export default router