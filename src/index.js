import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/products", productRouter)
app.use("/api/cart", CartRouter)



app.listen(PORT, () =>{
    console.log(`Servidor express funcionando en el puerto ${PORT}`);
})

