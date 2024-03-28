const express = require('express');
const router = express.Router();
const { createOrder, getAllOrdersUser, getAllOrdersShop, updateOrderStatus } = require('../controller/order');
const { shopAuthenticated } = require('../middleware/auth');

router.post("/create-order",createOrder);
router.get("/get-all-orders-user/:userId",getAllOrdersUser)
router.get("/get-all-orders-shop/:shopId",getAllOrdersShop)
router.put("/update-order-status/:id",shopAuthenticated,updateOrderStatus)

module.exports = router
