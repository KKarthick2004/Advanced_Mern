const express=require("express")
const userController=require("../controllers/userController")

const userrouter=express.Router()


userrouter.post("/register",userController.register)
userrouter.post("/login",userController.login)

module.exports={userrouter}