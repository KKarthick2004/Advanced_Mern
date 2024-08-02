const {productModel} =require("../models/productModel")
const {v4:uuid} = require("uuid")
// router.post("/create",async (req,res)=>{
//     try{
//         const product=req.body;
//         const products=new productModel(product)
//         const savedproduct=await products.save()
//         res.status(201).json(savedproduct)
//     }
//     catch(err){
//         res.status(500).json({message:err})
//     }
//     })

// module.exports={router}
const getAllProducts= async (req,res)=>{
   const products= await productModel.find({})
   console.log(req.user)
   res.send(products)
}
const createProduct=async (req,res)=>{
   try{
   const {title,price,image}=req.body;
   const product=new productModel({id:uuid(),title,price,image})
   await product.save()
   res.status(201).json({title,price,image})
   }
   catch(err){
      res.status(500).json({message:err})
   }
}
const updateProduct=async (req,res)=>{
   try{
      const {id}=req.params
      const updated=await productModel.findOneAndUpdate({id:id},{
         title:req.body.title,
         price:req.body.price,
         image:req.body.image
      })
      res.status(201).json(updated)
   }
   catch(err){
      res.status(500).json({message:err})
   }
}
const deleteProduct=async (req,res)=>{
   try{  
    const {id}=req.params;
   const idval=await productModel.find({id:id})
   if(idval.length==0){
          res.send("Product not found")
          return ;
   }
         const a=await productModel.findOneAndDelete({id:id})
         res.status(201).send(a)
         return ;
   }
   catch(err){
         res.status(500).send({message:err})
   }
}
module.exports={getAllProducts,createProduct,updateProduct,deleteProduct};
