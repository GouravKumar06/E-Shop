const express = require('express');
const { createProduct, getAllProductsId, deleteShopProductId, getAllProducts, createNewReview } = require('../controller/product');
const { upload } = require('../multer');
const { shopAuthenticated, isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.post('/create-product',upload.array('images'),createProduct)
router.get('/get-all-products-shop/:id',getAllProductsId);
router.delete('/delete-shop-product/:id',shopAuthenticated,deleteShopProductId);
router.get("/get-all-products",getAllProducts);
router.put("/create-new-review",isAuthenticated,createNewReview);


module.exports = router;
