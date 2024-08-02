const {userModel}=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const register= async(req,res)=>{
    try{
    const {username,email,password}=req.body

    const user=new userModel({username,email,password})

    await user.save()
    res.status(201).json("Success")
    }
    catch(err){
        res.status(500).json({message:err})
    }
    
}
const login=async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await userModel.findOne({email})

    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        return res.status(404).json({message:"Invalid Password"})
    }
    const token=jwt.sign({userId:user._id,email:user.email,Name:user.username},"secret_key",{expiresIn: "1h"})
    res.json({token})
}
catch(err){
    res.status(500).json({message:err})
}
}

module.exports={register,login
    
}