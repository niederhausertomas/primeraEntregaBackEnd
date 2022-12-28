import express from 'express'
import handlebars from "express-handlebars"
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import homeRouter from './routes/home.router.js'
import realTimeRouter from './routes/realTime.router.js'
import __dirname from './utils.js';
import { Server } from 'socket.io'

const app = express()
const httpServer = app.listen(8080, ()=> console.log('listening...'))
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.static(__dirname + '/public/'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

socketServer.on('connection', socket =>{
    console.log(socket.id);
    socket.on('msg_front', message => console.log(message));
    socket.emit('msg_back',"Conectado al servicio, Bienvenido desde el Back")
})
app.use((req,res,next)=>{
    req.io = socketServer
    next()
})


app.use('/realtimeproducts', realTimeRouter)
app.use('/home', homeRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)



