import express from "express"
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js"
import { __dirname } from "../utils.js"


//esto es con fs
//import ProductManager from "../Dao/controllers/fs/productManager.js"
//const manager = new ProductManager(__dirname+"/Dao/database/products.json")

const pm = new ProductManager()
const routerP = express.Router()


routerP.get("/products",async(req, res)=>{
    const productList = await pm.getProducts(req.query)
    res.json({productList})
})

routerP.get("/products/:pid",async(req, res)=>{
    const productFind = await pm.getProductById(req.params)
    res.json({ status: "success", productFind })
})

routerP.post("/products",async(req, res)=>{
    const newproduct = await pm.addProducts(req.body)
    res.json({ status: "success", newproduct })
})

routerP.put("/products/:pid", async(req, res)=>{
    const updateproduct = await pm.updateProduct(req.params, req.body)
    res.json({ status: "success", updateproduct })
})

routerP.delete("/products/:pid", async(req, res)=>{
    const id = parseInt(req.params.pid)
    const deleteproduct = await pm.deleteProduct(id)
    res.json({ status: "success", deleteproduct })
})

export default routerP;

