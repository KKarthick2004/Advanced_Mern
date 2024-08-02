const express=require("express")
const productController=require("../controllers/productController")
const {verifyToken}=require("../middleware/auth")
const router=express.Router()


router.get("/get",verifyToken,productController.getAllProducts)
router.post("/add",verifyToken,productController.createProduct)
router.patch("/update/:id",verifyToken,productController.updateProduct)
router.delete("/delete/:id",verifyToken,productController.deleteProduct)

module.exports={router}