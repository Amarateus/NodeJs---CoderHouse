import {
    Router
} from 'express'
import ProductManager from '../dao/database/productManager.js'

const router = Router()
const productManager = new ProductManager()

// rutas
// router.get("/", (req, res) => {
//     res.render('chat', {})
// })

export default router