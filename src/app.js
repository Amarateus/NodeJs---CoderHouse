// trabajando desde el back
import express from "express"
import {
    Server
} from 'socket.io'
import handlebars from 'express-handlebars'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import MongoStore from "connect-mongo"
import session from "express-session"
import passport from "passport"

import cartRouter from './routes/cart.router.js'
import productRouter from './routes/product.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'
import userRouter from './routes/user.router.js'
import mockingRouter from './routes/mocking.router.js'
import {
    messageModel
} from "./dao/models/mongo/message.model.js"
import initializePassport from "./config/passport.config.js"

dotenv.config()
// conexion a BD
const environment = async () => {
    await mongoose.connect(process.env.MONGO_CONNECT)
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
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_CONNECT,
            ttl: 10000,
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/chat", viewsRouter)
app.use('/api/sessions', sessionRouter);
app.use('/', userRouter);
app.use('/mockingProducts', mockingRouter)

// socketServer
socketServer.on('connection', (socket) => {
    console.log('Se conectó', socket.id)

    socket.on("mensaje", async (data) => {
        await messageModel.create(data)
        const mensajes = await messageModel.find().lean()

        socketServer.emit("nuevoMensaje", mensajes)
    })
})