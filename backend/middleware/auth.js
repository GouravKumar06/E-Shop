const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");


exports.isAuthenticated = async(req,res,next) =>{
    try{
        const {token} = req.cookies;  

        
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Please login to continue"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = await User.findById(decoded.id)

        next()

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"authentication failed"
        })
    }
}


exports.shopAuthenticated = async(req,res,next) =>{
    try{
        const {seller_token} = req.cookies;
        console.log("seller token:  ",seller_token)
        if(!seller_token)
        {
            return res.status(401).json({
                success:false,
                message:"Please login Shop to continue"
            })
        }

        const decoded = jwt.verify(seller_token,process.env.JWT_SECRET)

        console.log("decoded:  ",decoded)

        req.seller = await Shop.findById(decoded.id)

        console.log("req seller:  ",req.seller)

        next();
    }
    catch(error){
        console.log("error in shop auth::  ",error);
        return res.status(500).json({
            success:false,
            message:"Shop authentication failed"
        })
    }
}



