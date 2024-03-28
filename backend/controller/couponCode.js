const CouponCode = require('../model/couponCode')



exports.createCouponCode = async (req, res) => {
    try{
        const {name} = req.body;
        const isCouponCodeExist = await CouponCode.findOne({name});

        if(isCouponCodeExist)
        {
            return res.status(400).json({
                success: false,
                message: "Coupon code already exist"
            })
        }

        const couponCode = await CouponCode.create(req.body);

        return res.status(201).json({
            success: true,
            couponCode
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating coupon code"
        })
    }
}

exports.getCouponCodeShopId = async (req, res) => {
    try{
        const couponCodes = await CouponCode.find({shopId: req.seller.id});

        if(!couponCodes)
        {
            return res.status(400).json({
                success: false,
                message: "Coupon code does not exist"
            })
        }

        return res.status(200).json({
            success: true,
            couponCodes
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting coupon code"
        })
    }
}


exports.deleteCouponCode = async (req, res) => {
    try{
        const couponId = req.params.id;
        const couponCodeExist = await CouponCode.findById(couponId);
        if(!couponCodeExist)
        {
            return res.status(400).json({
                success: false,
                message: "Coupon code does not exist"
            })
        }

        const couponCode = await CouponCode.findByIdAndDelete(couponId);

        return res.status(200).json({
            success: true,
            message:"Coupon code deleted successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting coupon code"
        })
    }
}


exports.getCouponValue = async (req, res) => {
    try{
        const couponCode = await CouponCode.findOne({name:req.params.name});
        if(!couponCode)
        {
            return res.status(400).json({
                success: false,
                message: "Coupon code does not exist"
            })
        }
        return res.status(200).json({
            success: true,
            couponCode
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting coupon code"
        })
    }
}




