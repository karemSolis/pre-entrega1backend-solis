import {promises as fs} from 'fs'
import { nanoid } from 'nanoid';
import ProductManager from "./ProductManager.js";


const ProductALL = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/cart.json";
    };


readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
    };

writeCarts = async(carts) => {
    await fs.writeFile(this.path, JSON.stringify(carts))
    };

    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id)

    }

    addCarts = async() => {
        let cartPrevious= await this.readCarts();
        let id = nanoid()
        let cartsConcat = [{id :id, products : []}, ...cartPrevious]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"
    }

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if (!cartById) return "Carrito no existe"
        return cartById
    };

    

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if (!cartById) return "Carrito no existe"
        let productById = await ProductALL.exist(productId)
        if(!cartById) return "No se encuentra producto"

        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter((cart) => cart.id !== cartId)

        if(cartById.products.some((prod) => prod.id === productId)){
            let moreproductInCart = cartById.products.find((prod) => prod.id === productId)
            moreproductInCart.quantity++;
            console.log(moreproductInCart.quantity);
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado en el carrito"
        }

        cartById.products.push({id:productById.id, quantity: 1})
        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat)
        return "Producto en el carrito :)"

    };
}

export default CartManager