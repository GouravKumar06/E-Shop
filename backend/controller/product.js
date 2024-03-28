const Product = require("../model/product");
const Shop = require("../model/shop");
const fs = require("fs");
const Order = require("../model/order");


exports.createProduct = async (req, res) => {
    try{
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if(!shop)
        {
            return res.status(400).json({
                success: false,
                message: "Shop Id  not found"
            })
        }
        else{
            const files = req.files;
            const imageUrls = files.map((file) =>`${file.filename}`); 
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;
            const product = await Product.create(productData);

            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                product
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating product"
        })
    }
}

exports.getAllProductsId = async (req, res) => {
    try{
        const products = await Product.find({shopId : req.params.id});
        return res.status(200).json({
            success: true,
            products
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting all products"
        })
    }
}

//delete product of shop on the basis of id
exports.deleteShopProductId = async (req, res) => {
    try{
        const productId = req.params.id;
        const productData = await Product.findById(productId);

        productData.images.forEach((imageUrl)=> {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                }
            })            
        })

        const product = await Product.findByIdAndDelete(productId);

        if(!product)
        {
            return res.status(500).json({
                success: false,
                message: "Product not found with this id"
            })
        }
        
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting product"
        })
    }
}


//get all the products from database
exports.getAllProducts = async (req, res) => {
    try{
        const allProducts = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            allProducts
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting all products from databse"
        })
    }
}


exports.createNewReview = async (req, res) => {
    try{
        const {user,rating,comment,productId,orderId} = req.body;

        const product = await Product.findById(productId);

        const review = {
            user,
            rating,
            comment,
            productId
        }

        if(!product)
        {
            return res.status(500).json({
                success: false,
                message: "Product not found with this id"
            })
        }

        const isReviewed = product.reviews.find(
            (rev) => rev.user._id === req.user._id
        )

        if(isReviewed)
        {
            product.reviews.forEach((rev) => {
                if(rev.user._id === req.user._id)
                {
                    (rev.rating = rating), 
                    (rev.comment = comment),
                    (rev.user = user);
                }
            })
        }else{
            product.reviews.push(review)
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;

        await product.save({validateBeforeSave: false});

        await Order.findByIdAndUpdate(
            orderId,
            { $set: { "cart.$[elem].isReviewed": true } },
            { arrayFilters :[ { "elem._id": productId } ],new: true }

        )

        return res.status(200).json({
            success: true,
            message: "Review created successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating review"
        })
    }
}
