import { Server } from "socket.io";
import Producto from "../models/Producto.js";
import Mensaje from "../models/Mensaje.js";
import {getMensajes,guardarMensaje} from "../helpers/mensajes.js";
import { productoController } from "../controllers/productos.controller.js";
import { productos as prodRepo} from '../repository/productos.repository'
import {mensajes as mensajeRepo} from '../repository/mensajes.repository'


export const initIo = async(server)=> {
   let prods = await prodRepo.getAllproductos()
   // let mensajes = await getMensajes(archMessg);
    const io = new Server(server)
    io.on("connection", async socket => {
        

        socket.on("mensajes",async(data)=>{
            console.log("Me llego un Mensaje y lo voy a guardar")
            let mensaje = new Mensaje(data.email,data.fecha,data.texto);
            if(mensaje){
                await mensajeRepo.createMensaje(mensaje)
            }
            let mensajes = await mensajeRepo.getAllMensajes();
            io.emit('mensajes', mensajes);
        })
        socket.on("productos", async (data) => {
            console.log("Me llego un mensaje y lo llevo al arreglo")
            console.log(data);
            let produc = new Producto(data.title, data.price, data.thumbnail);
            if (produc) {
                let prod = await prodRepo.createProducto(produc)

                if(prod){
                    prods = await prodRepo.getAllproductos();
                    io.emit('productos', prods);
                }
            }
            
           
        });

        //Emito los mensajes 
        socket.on('askProducts', async(data) => {
            let prods = await prodRepo.getAllproductos();
            socket.emit('productos', prods);
        });

        socket.on('askMensajes',async (data) => {
            let mensajes = await mensajeRepo.getAllMensajes();
            socket.emit('mensajes', mensajes);
        });

    });
}
