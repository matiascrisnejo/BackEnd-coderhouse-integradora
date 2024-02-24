import { cartsModel } from "../../models/carts.model.js"
import ProductManager from "../Mongo/productManagerMongo.js"

const pm = new ProductManager()

export default class CartManager{
    
    // async getCarts(){
        
    //     try {
    //         return await cartsModel.find().lean()
    //     } catch (error) {
    //         return error
    //     }
    // }

    async findCartById(cid){
        const cart = await cartsModel.findById(cid)
        console.log("response", cart)
        return cart
    }

    async createCart(){
        const newCart = {products: []}
        const cart = await cartsModel.create(newCart)
        return cart
    }

    async addProductToCart(cid, pid){
        const cart = await cartsModel.findById(cid)
        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(pid))
        if(productIndex === -1){
            cart.products.push({
                product: pid,
                quantity: 1
            })
        } else{
            cart.products[productIndex].quantity++
        }
        return cart.save()
    }

    async deleteProduct(cid, pid){
        try {
            let cart = await this.getCartbyId(cid)
            const productIndex = cart.products.findIndex(p => p.pid === pid)
            if(productIndex === -1){
                throw new Error(`no se encotro el producto con id ${pid} en el carrito con id ${cid}`)
            }else{
                if (cart.products[productIndex].quantity > 1){
                    cart.products[productIndex].quantity--
                }else{
                    cart.products.splice(productIndex, 1)
                }
            }
            cart = await cartsModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true })
            return cart
        } catch (error) {
            throw error
        }
    }



}