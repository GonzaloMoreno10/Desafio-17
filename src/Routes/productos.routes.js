import express from "express";
const Router = express.Router();
import {productoController} from '../controllers/productos.controller'
import {productos} from '../repository/productos.repository'


//Inicializaciones

//Rutas

Router.get("/listar", productoController.getAllproductos);

Router.get("/listar/:id", productoController.getProductosByid);

Router.get("/vista", async (req, res) => {
   let products = await productos.getAllproductos() ;
   res.render("products/allProducts",{products})
})

Router.get("/actualizar/:id",productoController.getProductosByid);

Router.get("/new",(req, res) => {
    res.render("products/newProduct")
 })

Router.post("/crear",productoController.createProductos);

Router.delete("/eliminar/:id",productoController.deleteProductos);

Router.put("/actualizar/:id",productoController.updateProductos)


Router.get("/sala-products",async (req, res) => {
    res.render('products/sala')
})


export default Router;