const jwt = require('jsonwebtoken');
// create token and saving that in cookies
const shopToken = (shop, statusCode, res) => {
    const seller_token = jwt.sign({id : shop._id},process.env.JWT_SECRET,{
      expiresIn:"5d"
    })

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
   
  };

  return res.status(statusCode).cookie("seller_token", seller_token, options).json({
    success: true,
    shop,
    seller_token,
  });
};


module.exports = shopToken;