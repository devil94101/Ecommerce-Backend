const mongoose=require('mongoose')

const Product=mongoose.model("products",new mongoose.Schema({
    title:{
        type:String
    },
    description:String,
    image:String,
    price:Number,
    category:String
}))
module.exports=Product;