import {promises as fs} from 'fs'
import { nanoid } from 'nanoid';

class ProductManager{
    constructor(){
        this.path = "./src/models/products.json";
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    writeProducts = async(product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id)

    }

    addProducts = async (product) =>{
        let productsPrevious= await this.readProducts();
        product.id = nanoid()
        let productALL = [...productsPrevious, product];
        await this.writeProducts(productALL)
        return "Producto agregado correctamente";
    };
    
    getProducts = async ()=>{
        return await this.readProducts();
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if (!productById) return "Producto no encontrado"
        return productById
    };
    

    UpdateProduct = async(id, product) =>{
        let productById = await this.exist(id)
        if (!productById) return "Producto no encontrado"

        await this.delateProducts(id)
        let productPrevious = await this.readProducts()
        let products = [{...product, id : id}, ...productPrevious]
        await this.writeProducts(products)
        return "Producto actualizado"
    }

    delateProducts = async (id)=>{
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id ===id)
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"
        }
        return "El producto que quiere eliminar no existe"
        
    }
}

export default ProductManager


