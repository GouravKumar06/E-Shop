const jwt = require('jsonwebtoken');
// create token and saving that in cookies
const sendShopToken = (user, statusCode, res) => {
    const token = jwt.sign({id : user._id},process.env.JWT_SECRET,{
      expiresIn:"5d"
    })

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
   
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;