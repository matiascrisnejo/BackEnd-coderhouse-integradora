import { productsModel } from "../../models/products.model.js";


export default class ProductManager{

    async getProducts(){
        try {
            return await productsModel.find().lean()        //convierto a obj de js
        } catch (error) {
            return error
        }
    }

     async getProductsView(){
         try {
             return await productsModel.find().lean();

         } catch (err) {
             return err
         }
    }

    async getProductById(id){
        try {
            return await productsModel.findById(id)
        } catch (err) {
            return {error: err.message}
        }
    }

    async addProducts(product){
        try {
            await productsModel.create(product)
            return await productsModel.findOne({ title: product.title })
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, product){
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: product})
        } catch (error) {
            return error
        }
    }
    
    async deleteProduct(id){
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }
}