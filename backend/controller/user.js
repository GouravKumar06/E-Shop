
const User = require('../model/user');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/sendMail');
const sendShopToken = require('../utils/sendToken');
const fs = require('fs');


exports.createUser = async(req,res) =>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password ){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            });
        }
        
        const existingUser = await User.findOne({email});

        if(existingUser)
        { 
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath,(err)=>{
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });                  
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        const filename = req.file.filename
        const fileUrl = path.join(filename)

        const hashedPassword = await bcrypt.hash(password,10);

        const user = {
            name:name,
            email:email,
            password:hashedPassword,
            avatar:fileUrl
        }

        const token = jwt.sign(user,process.env.JWT_SECRET,{
            expiresIn:"5d"
        })

        const activationUrl = `http://localhost:3000/activation/${token}`;

        try{
            await mailSender(email,"Activation Url",`Please click here to activate your account ${activationUrl}`);
            return res.status(201).json({
                success:true,
                message:"Please, Check your email to activate your account."
            })
        }catch(error){
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

exports.activation = async(req,res) =>{
    try{
        const {token} = req.body;

        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"token is missing"
            });
        }

        const newUser = jwt.verify(token,process.env.JWT_SECRET);

        if(!newUser)
        {
            return res.status(402).json({
                success:false,
                message:"invalid token"
            });
        }

        const { name, email, password, avatar } = newUser; // destructing concept ka use kiya h

        let existUser = await User.findOne({email});

        if(existUser)
        {
            return res.status(400).json({
                success:false,
                message:"user exixt krta h"
            });
        }else{
            existUser = await User.create({
                name,email,password,avatar,token
            })
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error while activation"
        });
    }    
}

exports.loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            });
        }

        const user = await User.findOne({email}).select("+password");

        if(!user)
        {
            return res.status(402).json({
                success:false,
                message:"Please signup first"
            })
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch)
        {
            return res.status(400).json({
                success:false,
                message:"passwords does not match "
            })
        }

        sendShopToken(user,201,res);
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while login"
        })
    }
}

exports.getUser = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id)

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            })
        }


        return res.status(200).json({
            success:true,
            user
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error:error.message
        })
    }
}

exports.logout = async(req,res) =>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })

        return res.status(201).json({
            success : true,
            message:"Logged out successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"error while logout"
        })
    }
}


//update user information
exports.updateUser = async(req,res) =>{
    try{
        const {email,password,phoneNumber,name } = req.body;


        const ExistUser = await User.findOne({email}).select("+password");


        if(!ExistUser)
        {
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password,ExistUser.password);

        if(!isMatch)
        {
            return res.status(400).json({
                success:false,
                message:"password does not match"
            })
        }

        const user = await User.findByIdAndUpdate(req.user.id,{
            email,
            name,
            phoneNumber,
        },{new:true})

        return res.status(200).json({
            success:true,
            user
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


//update user avatar
exports.updateAvatar = async(req,res) =>{
    try{
        const existUser = await User.findById(req.user.id);

        const existAvatarPath = `uploads/${existUser.avatar}`;

        fs.unlinkSync(existAvatarPath);

        const fileUrl = path.join(req.file.filename);

        const user = await User.findByIdAndUpdate(req.user.id,{
            avatar:fileUrl
        },{new:true})

        return res.status(200).json({
            success:true,
            user
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


//update user addresses
exports.updateUserAddresses = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id);


        const sameTypeAddress = user.addresses.find((address) => address.addressType === req.body.addressType);

        if(sameTypeAddress)
        {
            return res.status(400).json({
                success:false,
                message:"Address type already exists"
            })
        }

        const existAddress = user.addresses.find((address) => address._id === req.body._id);

        if(existAddress)
        {
            Object.assign(existAddress,req.body);
        }
        else{
            user.addresses.push(req.body);
        }

        await user.save();

        return res.status(200).json({
            success:true,
            user
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"error while update addresses"
        })
    }
}


//delete user address
exports.deleteUserAddress = async(req,res) =>{
    try{
        let user = await User.findById(req.user.id);
        const addressId = req.params.id;

        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            })
        }

        user.addresses = user.addresses.filter((address) => address._id.toString() !== addressId);

        await user.save();

        return res.status(200).json({
            success:true,
            user
        })

        
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"error while delete address"
        })
    }
}

//update user password
exports.updateUserPassword = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("+password");

        const isMatch = await bcrypt.compare(req.body.oldPassword,user.password);

        if(!isMatch)
        {
            return res.status(402).json({
                success:false,
                message:"old password is not correct"
            })
        }

        if(req.body.newPassword !== req.body.confirmPassword)
        {
            return res.status(401).json({
                success:false,
                message:"password does not match with each other"
            })
        }

        user.password = req.body.newPassword;

        await user.save();
        
        return res.status(200).json({
            success:true,
            message:"password update successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"error while update password"
        })
    }
}

