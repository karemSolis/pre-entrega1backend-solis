import express from "express"; //importación de express
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import { engine } from "express-handlebars"; /*importación de módulo express-handlebars, osea la biblio para usar motores de plantillas handlebars con express */
import * as path from "path" /*importación del módulo path de node.js, entrega utilidades para trabajar con rutas de archivos y directorios */
import __dirname from "./utils.js"; /*importación de la variable __dirname desde el archivo utils.js*/
import ProductManager from "./controllers/ProductManager.js";
import { Server } from 'socket.io' //importación de librería socket.io

const app = express(); //aquí la creación de la instancia de la apli express
const httpServer = app.listen(8080, () => console.log( "servidor en el puerto 8080" )); //definición del puerto http

const socket = new Server(httpServer);  /*definición de la librería socket.io la cual permite habilitar la camunicación en tiempo real
entre un servidor (backend) y un cliente (fronted), se crea un servidor que funciona a través de socket con el servidor que ya creamos. */
/*PUEDO VER SI ESTÁ CONECTADO EL FRONT CON SOCKET.IO COLOCANDO EN EL NAVEGADOR http://localhost:8080/socket.io/socket.io.js*/

const product = new ProductManager(); /*esta variable es la copia de product.routes, pero es de ProductManager y
todas sus funcionalidades. averiguar + */


//middleware

//analizarán solicitudes HTTP entrantes y los convertirán en formato json o url
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const User = {};

socket.on("connection", (socket) => { /*establece una conexión con socketServer.on, escucha el primer mensaje iniciando comunicación y deja un primer 
mensaje "connection" el cual se va a desprender desde socket generando una función*/
    console.log("Un usuario conectado") /*esta función nos permite saber si el front se está conectando mediante a este console.log*/

        socket.on("messaje", (data)=>{
        console.log(data);
    })

    socket.on("newProduct", productData => {

        product.addProducts(productData)
    
        console.log("Nuevo producto recibido:", productData);
        
        socket.emit("productAdded", productData);
    });

})

//estos middlewars son toda la extructura de handlebars
app.engine("handlebars", engine());  /*acá le digo al servidor que usaremos M.P.handlebars para el uso de express y que será a
través de engine()*/
app.set("view engine", "handlebars"); /*acá le digo al server que los archivos de view terminaran con la extensión .handlebars, se establece la vista
como handlebars, eso significa que express usará handlebars para renderizar las vistas*/
app.set("views", path.resolve(__dirname + "/views")); /*y además obvio debo decirle donde encontrar esos archivos, estableciendo la ubicación de las vistas
es una ruta absoluta al directorio de vistas que utiliza __dirname que he importado desde utils.js, así que express buscará en ese directorio las*/


//middleware para archivos estáticos
app.use("/", express.static(__dirname + "/public")) /*con __dirname le índico que en puclic estarán los archivos estáticos como el 
style.css y realtimeproduct.js dentro de public*/

//ruta a la página principal
app.get("/", async(req, res) =>{
    let products = await product.getProducts()/*gracias a la constante product copiada y pegada desde product.router puedo reutilizar funciones de rutas hechas ahí */
    res.render("home", { /*este render nos renderizará el archivo handlebars en main, pero a través de lo que hagamos en home */
        title: "handlebars y websockets",
        products: products,
    })
})

app.use("/realtimeproducts", productRouter)



app.use("/products", productRouter)
app.use("/api/cart", CartRouter)





