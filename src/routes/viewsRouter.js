import {
    Router
} from 'express'
import ProductManager from "../productManager.js"

const productManager = new ProductManager()

const router = Router()

// rutas
router.get("/", (req, res) => {
    const productos = productManager.getProducts()
    
    res.render('home', {productos})
})

router.get("/realTimeProducts", (req, res) => {
    const productos = productManager.getProducts()
    
    res.render('realTimeProducts', {productos})
})

export default router