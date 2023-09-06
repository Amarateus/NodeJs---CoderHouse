import {
    Router
} from 'express'

const router = Router()

// rutas
router.get("/", (req, res) => {
    const productos = productManager.getProducts()

    res.render('home', {
        productos
    })
})

router.get("/realTimeProducts", (req, res) => {
    res.render('realTimeProducts', {})
})

export default router