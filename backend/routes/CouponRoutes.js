const express = require('express');
const { createCouponCode, getCouponCodeShopId, deleteCouponCode, getCouponValue } = require('../controller/couponCode');
const { shopAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.post("/create-coupon",shopAuthenticated,createCouponCode);
router.get("/get-coupon/:id",shopAuthenticated,getCouponCodeShopId);
router.delete("/delete-coupon/:id",shopAuthenticated,deleteCouponCode)
router.get("/get-coupon-value/:name",getCouponValue)

module.exports = router