import express from "express"
import CartManager from "../Dao/controllers/Mongo/cartManagerMongo.js"
import { __dirname } from "../utils.js"


//esto es fs
//import CartManager from "../Dao/controllers/fs/productManager.js"
//const cm=new CartManager(__dirname+'/Dao/database/carts.json')

const cm = new CartManager()
const routerC =express.Router()

routerC.get("/",async(req,res)=>{
   const carrito=await  cm.getCarts()
   res.json({carrito})
})

routerC.get("/:cid",async(req,res)=>{
    const carritofound=await cm.getCartbyId(req.params)
    res.json({status:"success",carritofound})
})


routerC.post("/", async (req, res) => {
    const newcart = await cm.addCart();
     res.json({ status: "success", newcart });
  });

  routerC.post("/:cid/products/:pid", async (req, res) => {
    try {
      const cid = parseInt(req.params.cid);
      const pid = parseInt(req.params.pid);
  
      await cm.addProductToCart(cid, pid);
      res.json({ status: "success", message: "Product added to cart successfully." });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ status: "error", message: "Failed to add product to cart." });
    }
  });
  

export default routerC