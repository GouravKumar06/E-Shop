const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter product name!"],
    },
    description:{
        type: String,
        required: [true, "Please enter product description!"],
    },
    category:{
        type: String,
        required: [true, "Please enter product category!"],
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type:Number
    },
    discountPrice:{
        type:Number,
        required: [true, "Please enter product discount price!"],
    },
    stock:{
        type:Number,
        required: [true, "Please enter product stock!"],
    },
    images:[
        {
            type: String
        }
    ],
    reviews:[
        {
            user:{
                type:Object
            },
            comment:{
                type:String
            },
            rating:{
                type:Number
            },
            productId:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    ratings:{
        type:Number,
    },
    shopId:{
        type: String,
        required:true
    },
    shop:{
        type:Object,
        required:true
    },
    sold_out:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Product", productSchema);