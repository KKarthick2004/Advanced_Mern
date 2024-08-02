const mongoose=require("mongoose")
const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const {router}=require("./routes/product")   
const {userrouter}=require("./routes/user")
const {Addrouter}=require("./routes/add")
const {orderrouter}=require("./routes/order")


const app=express()

app.use(bodyParser.json())

app.use(cors())


 const mongooseConnect=async ()=>{
    try{
      await mongoose.connect("mongodb+srv://karthickk2022:Karthick2004@reciepe.vc4jidx.mongodb.net/web?retryWrites=true&w=majority&appName=reciepe")
      console.log("Db connected")
    }
    catch(err){
      console.log(err)
    }
    }
 mongooseConnect()
 app.set("view engine", "ejs")

 app.use("/",router)
 app.use("/auth",userrouter)
 app.use("/add",Addrouter)
 app.use("/order",orderrouter)
 const port=process.env.PORT || 6000
 app.listen(port,()=>console.log("Port Activated"))
