const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    userId:{
        type:String
    },
    product:[{
        productId:{
            type:String
        },
        quantity:{
            type:String
        }
    }
    
    ]
})
const Addmodel=mongoose.model("Add",schema)
module.exports={Addmodel}