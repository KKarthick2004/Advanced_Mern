const {Addmodel}=require("../models/Add")
const {productModel}=require("../models/productModel")
const AddCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        let cart = await Addmodel.findOne({ userId });

        if (!cart) {
            cart = new Addmodel({
                userId,
                product: [{ productId, quantity }]
            });
            await cart.save();
            return res.status(201).json({message:"Created"})
        } else {
            const productIndex = cart.product.findIndex(p => p.productId === productId);

            if (productIndex > -1) {
                cart.product[productIndex].quantity = quantity;
            } else {
                cart.product.push({ productId, quantity });
            }

            await cart.save();
        }
        res.status(200).json({ message: "Cart updated successfully", cart });
    }
    catch(err){
        console.log(err)
    }
}

const getDetails=async(req,res)=>{
    res.send("Called")
   }

const deleteproduct=async(req,res)=>{
    const id=req.user.userId
    const productId=req.body.productId
    const response=await Addmodel.find({userId:id})
    const products=response[0].product
    if(products.length==1){
        await Addmodel.findOneAndDelete({userId:id})
        return res.send("Cart deleted")
    }
    const arr=products.filter((item)=>{
        if(item.productId!=productId){
            return item.productId
        }
    })
    response[0].product=arr
    await response[0].save()
    res.send(arr)
}

module.exports={AddCart,getDetails,deleteproduct}
