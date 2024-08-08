const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    id:{
     type:String,
     unique:true,
    },
    title:{
        type:String,
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
