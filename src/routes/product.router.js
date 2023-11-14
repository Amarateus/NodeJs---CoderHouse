import {
    Router
} from "express";
import ProductController from "../controllers/product.controller.js"
import privateRoutes from "../middlewares/privateRoutes.js"

const productController = new ProductController()

const router = Router()

// Rutas

// traer todos los productos
// puede recibir un limite de productos a devolver
router.get("/", privateRoutes, async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10
    const page = req.query.page ? parseInt(req.query.page, 10) : 1
    // la query se recibe con el formato ?query={"nombre": "Mateo"}
    const query = req.query.query ? req.query.query : {}
    const sort = req.query.sort ? parseInt(req.query.sort, 10) : 1

    const products = await productController.getProducts(limit, page, query, sort)

    const first_name = req.session.first_name
    const rol = req.session.rol

    const usuario = req.session.email
    console.log(usuario)

    res.render('products', {products, first_name, rol})
})

// traer un producto por su id
router.get("/:pid", async (req, res) => {
    const productId = req.params.pid
    const respuesta = await productController.getProductById(productId)
    res.status(200).send(respuesta)
})

// crear un producto
router.post("/", async (req, res) => {
    const {
        title,
        category,
        description,
        price,
        code,
        stock
    } = req.body
    const respuesta = await productController.addProduct(title, category, description, price, code, stock)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    }

    res.status(201).send(`El producto ${respuesta.title} se creo correctamente`)
})

// actualizar un producto
router.put("/:pid", async (req, res) => {
    const productId = req.params.pid
    const newProduct = req.body
    const respuesta = await productController.updateProduct(productId, newProduct)

    if (respuesta.error) {
        return res.status(400).send(respuesta)
    } else if (respuesta.acknowledged === false) {
        return res.status(400).send("El campo que desea actualizar no existe")
    }

    res.status(201).send(respuesta)
})

// eliminar un producto
router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid
    const respuesta = await productController.deleteProductById(productId)

    if (respuesta.error) {
        res.status(400).send(respuesta)
    }

    res.status(200).send(`El producto con id ${productId} fue eliminado`)
})

// export router
export default router