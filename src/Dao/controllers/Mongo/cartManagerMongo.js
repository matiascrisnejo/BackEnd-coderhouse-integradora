import { cartsModel } from "../../models/carts.model.js"
import { ProductManager } from "../../controllers/Mongo/productManagerMongo.js"

const pm = new ProductManager()


export default class CartManager{
    
    async getCarts(){
        try {
            return await cartsModel.find().lean()
        } catch (error) {
            return error
        }
    }

    async getCartbyId(id){
       try {
        return await cartsModel.findById(id)
       } catch (err) {
            return {error: err.message}
       }
    }


    async addCart(){
        try {
            let cart = {
                prooducts: []
            }
            cart = await cartsModel.create(cart)
            if(!cart){
                throw new Error("no se pudo crear el carrito")
            }
            return cart
        } catch (error) {
            throw error
        }
    }

    async addProductToCart(cid, pid){
        
        try {
            await pm.getProducts().getProductById(pid)
            let cart = await this.getCartbyId(cid)
            const productIndex = cart.products.findIndex(p => p.pid === pid)
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++
            } else {
                cart.products.push({
                    pid,
                    quantity: 1
                  })
            }
            cart = await cartsModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true })
            return cart
        } catch (error) {
            throw error
        }
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