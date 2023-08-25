import express from "express"
import productRouter from "./routes/productRouter.js"
import ProductManager from "./productManager.js"

const productManager = new ProductManager()

// Config del server
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use("/api/products", productRouter)

// Server listener
app.listen(8080, () => {
    console.log("Listening on Port 8080")
})

export default productManager