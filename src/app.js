// trabajando desde el back
import express from "express"
// import {Server} from 'socket.io'
import handlebars from 'express-handlebars'
import ProductManager from "./dao/fs/productManager.js"
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'

// Config del server
const app = express()
const httpServer = app.listen(8080, () => {
    console.log("Listening on Port 8080")
})
// const socketServer = new Server(httpServer)

// conexion a BD
mongoose.connect('mongodb+srv://mateocv759:pDCXwZ7aBxuHlh1a@ecommerce.aiopsql.mongodb.net/ecommerce?retryWrites=true&w=majority')

// config
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

// middlewares
app.use(express.static('./src/public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)