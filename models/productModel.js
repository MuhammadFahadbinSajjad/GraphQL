const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name:{
            type:String
        },
        quantity:{
            type:Number,
            default:0
        },
        price:{
            type:Number
        },
        image:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema)
module.exports = Product