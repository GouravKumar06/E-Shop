const express = require('express');
const { createShop, activationShop, loginShop, getShop, logoutShop, getShopInfo, updateShopAvatar, updateShop } = require('../controller/shop');
const router = express.Router();
const {upload} = require('../multer');
const { shopAuthenticated } = require('../middleware/auth');


router.post('/create-shop', upload.single('file') ,createShop);
router.post('/activationShop',activationShop);
router.post("/shopLogin",loginShop);
router.get("/getShop",shopAuthenticated,getShop);
router.get("/logoutShop",shopAuthenticated,logoutShop);
router.get("/get-shop-info/:id",getShopInfo);
router.put("/update-shop-avatar",shopAuthenticated,upload.single('file'),updateShopAvatar);
router.put("/update-shop",shopAuthenticated,updateShop)


module.exports = router;