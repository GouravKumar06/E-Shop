const Shop = require("../model/shop");

const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/sendMail");
const fs = require("fs");
const shopToken = require("../utils/shopToken");

exports.createShop = async (req, res) => {
    try{
       const {email} = req.body;
       
        const sellerEmail = await Shop.findOne({email});
        if(sellerEmail){
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err){
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            })
            return res.status(400).json({
                success:false,
                message:"Shop already exists"
            })
        }
        
        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const seller = {
            name:req.body.name,
            email:email,
            phoneNumber:req.body.phoneNumber,
            password:hashedPassword,
            address:req.body.address,
            avatar:fileUrl,
            zipCode:req.body.zipCode
        }

        const seller_token = jwt.sign(seller,process.env.JWT_SECRET,{expiresIn:"5d"});
        
        const activationUrl = `http://localhost:3000/shop/activation/${seller_token}`;

        try{
            await mailSender(email,"shop activation token",`Please click here to activate your seller account ${activationUrl}`);
            return res.status(201).json({
                success:true,
                message:"Please, Check your email to activate your Seller account."
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"error while sending mail"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"error while signup"
        });
    }
}


exports.activationShop = async(req,res) =>{
    try{
        const {seller_token} = req.body;
       
        const newSeller = jwt.verify(seller_token,process.env.JWT_SECRET);

        if(!newSeller){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            })
        }

        const {name,email,password,avatar,phoneNumber,address,zipCode} = newSeller; // use of destructuring concept

        let existShop = await Shop.findOne({email});

        try{
            if(existShop){
                return res.status(400).json({
                    success:false,
                    message:"Shop already exists"
                })
            }
            else{
                existShop = await Shop.create({
                    name,
                    email,
                    password,
                    avatar,
                    phoneNumber,
                    address,
                    zipCode,
                    seller_token
                })
            }

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"error while creating shop"
            });
        }

        console.log("exist shop",existShop);
       
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error while activation"
        });
    }
}


exports.loginShop = async(req,res) =>{
    try{
        const {email,password} = req.body;

        const existShop = await Shop.findOne({email}).select("+password");

        if(!existShop){
            return res.status(400).json({
                success:false,
                message:"Shop does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password,existShop.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"password does not match"
            })
        }

        shopToken(existShop,200,res);

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while login Shop"
        });
    }
}


exports.getShop = async(req,res) =>{
    try{
        const shop = await Shop.findById(req.seller.id);

        if(!shop)
        {
            return res.status(400).json({
                success:false,
                message:"Shop does not exist"
            })
        }
        
        return res.status(200).json({
            success:true,
            shop
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while get Shop"
        });
    }
}


exports.logoutShop = async(req,res) =>{
    try{
        res.cookie("seller_token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })

        return res.status(201).json({
            success:true,
            message:"Logged out successfully from shop"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while logout Shop"
        });
    }
}


//get shop info
exports.getShopInfo = async(req,res) =>{
    try{
        const shop = await Shop.findById(req.params.id);
        if(!shop)
        {
            return res.status(400).json({
                success:false,
                message:"Shop does not exist"
            })
        }
        return res.status(200).json({
            success:true,
            shop
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while get Shop Info"
        });
    }
}


//update shop
exports.updateShop = async(req,res) =>{
    try{

        const {phoneNumber,name,zipCode,description,address } = req.body;


        const ExistShop = await Shop.findById(req.seller.id);       

        console.log("exist shop",ExistShop);

        // const existAvatarPath = `uploads/${ExistShop.avatar}`;

        // fs.unlinkSync(existAvatarPath);

        if(!ExistUser)
        {
            return res.status(400).json({
                success:false,
                message:"shop does not exist"
            })
        }

        const shop = await Shop.findByIdAndUpdate(req.user.id,{
            zipCode,
            description,
            address,
            name,
            phoneNumber,
        },{new:true})

        return res.status(200).json({
            success:true,
            shop
        })

    }  
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"error while update user"
        })
    }
}


//update shop avatar
exports.updateShopAvatar = async(req,res) =>{
    try{
        const existShop = await Shop.findById(req.seller.id);
        console.log("exist shop",existShop);
        const existAvatarPath = `uploads/${existShop.avatar}`;

        fs.unlinkSync(existAvatarPath);

        const fileUrl = path.join(req.file.filename);

        const shop = await Shop.findByIdAndUpdate(req.seller.id,{
            avatar:fileUrl
        },{new:true})
        
        console.log("shop",shop);
        return res.status(200).json({
            success:true,
            shop
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"error while update avatar"
        })
    }
}
