import {
    Router
} from "express";
import { generate100Products } from "../services/mocking.js";

const router = Router()

router.get('/', async (req, res) => {
    const products = await generate100Products()
    res.send(products)
})

export default router