const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    id:{
     type:String,
     unique:true,
     required:true,
    },
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
        required:true,
    },
    rating:{
         rate:{
             type:String,
         },
         count:{
             type:Number,
         }
    }

})

const productModel=mongoose.model("products",productSchema)

module.exports={productModel}