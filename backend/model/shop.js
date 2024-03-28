const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your shop email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  description:{
    type: String,
  },
  phoneNumber:{
    type: Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  role:{
    type: String,
    default: "Seller",
  },
  avatar:{
    type:String,
    required :true
  },
  zipCode:{
    type:Number,
    required:true
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  },
  seller_token: {
		type: String,
	},
  resetPasswordToken:String,
  resetPasswordTime:Date
 
},{timestamps:true});

module.exports = mongoose.model("Shop", shopSchema);