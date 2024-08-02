const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const user=new mongoose.Schema({
    username:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
user.pre("save",async function(next){
    if(!this.isModified("password"))
        return next()
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next();
})
const userModel=mongoose.model("user",user)

module.exports={userModel}
