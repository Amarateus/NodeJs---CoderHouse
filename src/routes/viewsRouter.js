import {
    Router
} from 'express'

const router = Router()

// rutas
router.get("/", (req, res) => {
    res.render('chat', {})
})


export default router