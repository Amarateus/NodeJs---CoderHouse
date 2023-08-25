import express from "express"
import productRouter from "./routes/productRouter.js"

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