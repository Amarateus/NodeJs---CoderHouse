// trabajando desde el back
import express from "express"
import {
    Server
} from 'socket.io'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js'
import {
    messageModel
} from "./dao/models/message.model.js"

// conexion a BD
const environment = async () => {
    await mongoose.connect('mongodb+srv://mateocv759:pDCXwZ7aBxuHlh1a@ecommerce.aiopsql.mongodb.net/ecommerce?retryWrites=true&w=majority')
}
await environment()

// Config del server
const app = express()
const httpServer = app.listen(8080, () => {
    console.log("Listening on Port 8080")
})
const socketServer = new Server(httpServer)

// config
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

// middlewares
app.use('/static', express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// routes
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/chat", viewsRouter)

// socketServer
socketServer.on('connection', (socket) => {
    console.log('Se conectó', socket.id)

    socket.on("mensaje", async (data) => {
        await messageModel.create(data)
        const mensajes = await messageModel.find().lean()

        socketServer.emit("nuevoMensaje", mensajes)
    })
})