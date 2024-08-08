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

const getCartProductDetails = async (req, res) => {
    let response;
    const a = [];
    try {
        const Id = req.user.userId;
        response = await cartModel.find({ userId: Id });

        if (!response || response.length === 0) {
            return res.status(404).send({ message: "Cart not found" });
        }

        // console.log(response);

        const products = response[0].product;
        const arr = products.map((item) => item.productId);
        // console.log(arr);

        for (let i = 0; i < arr.length; i++) {
            const value = await productModel.find({ id: arr[i] });
            // console.log(value);

            if (!value || value.length === 0) {
                console.log(Product with id ${arr[i]} not found);
                continue; // Skip to the next product if not found
            }

            const obj = {};
            obj.id = value[0].id;
            obj.price = value[0].prize; // Ensure this matches the schema
            obj.title = value[0].title;
            obj.image = value[0].image;
            obj.description = value[0].description;

            // Find the product in the cart to get the correct quantity
            const cartProduct = products.find(p => p.productId === arr[i]);
            obj.quantity = cartProduct ? cartProduct.quantity : "0";

            a.push(obj);
        }

        res.send(a);
    } catch (err) {
        console.log(err);
        res.status(500).send(Err);
    }
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
