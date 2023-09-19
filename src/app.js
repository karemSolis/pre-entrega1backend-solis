import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from 'socket.io'

const app = express();
const httpServer = app.listen(8080, () => console.log( "servidor en el puerto 8080" ));

const socketServer = new Server(httpServer);  



const product = new ProductManager(); /*esta variable es la copia de product.routes, pero es de ProductManager y 
todas sus funcionalidades. averiguar + */


//middleware 

//analizarán solicitudes HTTP entrantes y los convertirán en formato json o url 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//estos middlewars son toda la extructura de handlebars
app.engine("handlebars", engine());  /*acá le digo al servidor que usaremos M.P.handlebars para el uso de express y que será a 
través de engine()*/
app.set("view engine", "handlebars"); /*acá le digo al server que los archivos de view terminaran con la extensión .handlebars, se establece la vista
como handlebars, eso significa que express usará handlebars para renderizar las vistas*/
app.set("views", path.resolve(__dirname + "/views")); /*y además obvio debo decirle donde encontrar esos archivos, estableciendo la ubicación de las vistas
es una ruta absoluta al directorio de vistas que utiliza __dirname que he importado desde utils.js, así que express buscará en ese directorio las*/                             


//middleware para archivos estáticos
app.use("/", express.static(__dirname + "/public")) /*con __dirname le índico que en puclic estarán los archivos estáticos como el style.css*/


app.get("/", async(req, res) =>{ 
    let products = await product.getProducts()/*gracias a la constante product copiada y pegada desde product.router puedo reutilizar funciones de rutas hechas ahí */
    res.render("partials/home", { /*este render nos renderizará el archivo handlebars en main, pero a través de lo que hagamos en home */
        title: "handlebars y websockets",
        products: products,
    })
})

app.use("/products", productRouter)
app.use("/api/cart", CartRouter)





