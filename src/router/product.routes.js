import {Router} from "express";
import ProductManager from "../controllers/ProductManager.js";



const product = new ProductManager();

const productRouter = Router();

productRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.getProductsById(id));
});


productRouter.get("/", async (req, res)=>{
    res.send(await product.getProducts())
})


productRouter.post("/", async (req, res) =>{
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
    
})

productRouter.put("/:id", async (req, res) =>{
    let id = req.params.id
    let UpdateProduct = req.body;
    res.send(await product.UpdateProduct(id, UpdateProduct));
})

productRouter.delete("/:id", async (req, res) =>{
    let id = req.params.id
    res.send(await product.delateProducts(id));
})

export default productRouter