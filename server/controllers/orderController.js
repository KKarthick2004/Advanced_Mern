const {Ordermodel}=require("../models/order")
const {Addmodel}=require("../models/Add")
const {productModel}=require("../models/productModel")
const {v4:uuid}=require("uuid")

const Order=async(req,res)=>{
    const OrderId=uuid()
    const userId=req.user.userId
    const email=req.user.email
    const Name=req.user.Name
    const address=req.body.address
    const PhoneNumber=req.body.PhoneNumber
    const orderDate=new Date()
    const products=await Addmodel.find({userId}) 
    const productId=products[0].product
    const arr=productId.map((item)=>{
        return item.productId
    })
    let total=0
    const product=[]
       for(let i=0;i<arr.length;i++){
        const response=await productModel.find({id:arr[i]})
        const obj={}
        obj.title=response[0].title
        obj.price=response[0].price
        obj.quantity=productId[i].quantity
        total+=(response[0].price)*Number(productId[i].quantity)
        product.push(obj)
    }
    function addDate(date,days){
        const result=new Date(date)
        result.setDate(result.getDate()+days)
        return result
    }
   const est_Date=addDate(orderDate,10)
    const response=new Ordermodel({OrderId,userId,email,Name,products:product,orderDate,est_Date,Total:total,address,PhoneNumber})
    await response.save()
    res.send(response)
}

const getOrder=async(req,res)=>{
try{    
    const response=await Ordermodel.findOne({userId:req.user.userId})
    const {OrderId,orderDate,est_Date,products,orderStatus}=response
    res.status(201).json({OrderId,orderDate,est_Date,products,orderStatus})
}
 catch(err){
    res.status(500).send(err)
 }
}

module.exports={Order,getOrder}