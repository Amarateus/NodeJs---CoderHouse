// const express = require("express")
import express from "express"
import ProductManager from "./productManager.js"

// Instancio la clase
const productManager = new ProductManager()

// Config del server
const app = express()
app.use(express.urlencoded({
    extended: true
}))

// Rutas
app.get("/products", (req, res) => {
    const products = productManager.getProducts()
    const limit = parseInt(req.query.limit, 10)
    console.log(limit)
    if (limit) {
        const limitList = []
        for (let i = 0; i < limit && i < products.length; i++) {
            limitList.push(products[i])
        }
        return res.send(limitList)
    }
    res.send(products)
})

app.get("/products/:pid", (req, res) => {
    const productId = parseInt(req.params.pid, 10)
    const selectedProduct = productManager.getProductById(productId)
    res.send(selectedProduct)
})

// Server listener
app.listen(8080, () => {
    console.log("Listening on Port 8080")
})