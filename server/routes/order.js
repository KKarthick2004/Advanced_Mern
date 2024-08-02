const orederController=require("../controllers/orderController")
const {verifyToken}=require("../middleware/auth")
const express=require("express")

const orderrouter=express.Router()

orderrouter.post("/order",verifyToken,orederController.Order)
orderrouter.get("/getorder",verifyToken,orederController.getOrder)

module.exports={orderrouter}