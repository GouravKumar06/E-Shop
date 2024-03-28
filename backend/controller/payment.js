const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post("/process", async(req, res) => {
    try{
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce"
            },
            description:"Payment for items in cart",
        });
        
        console.log("amount: ",req.body.amount);
        console.log(myPayment);
        return res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


router.get("/stripeApiKey",async(req,res) =>{
    try{
        return res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY  })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = router