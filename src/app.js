// trabajando desde el back
import express from "express"
import {
    Server
} from 'socket.io'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/viewsRouter.js'
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import ProductManager from "./productManager.js"

const productManager = new ProductManager()

// Config del server
const app = express()
const httpServer = app.listen(8080, () => {
    console.log("Listening on Port 8080")
})
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.static('./src/public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    req.context = {
        socketServer
    }
    next()
})

app.use("/api/products", productRouter)

app.use("/api/carts", cartRouter)


app.use("/", viewsRouter)

socketServer.on('connection', (socket) => {
    console.log(`Se conectó el usuario con socket id: ${socket.id}`);

    socket.on('nuevoProducto', (data)=>{
        const mensaje = data.mensaje

        const productosActualizados = productManager.getProducts()
        
        socketServer.emit('productosActualizados', {productosActualizados})

    })
});