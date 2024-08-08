const express=require("express")
const addProduct=require("../controllers/addProduct")
const {verifyToken}=require("../middleware/auth")
const Addrouter=express.Router()

Addrouter.post("/addCard",verifyToken,addProduct.AddCart)
Addrouter.get("/get",verifyToken,addProduct.getDetails)
Addrouter.post("/delete",verifyToken,addProduct.deleteproduct)
module.exports={Addrouter}
