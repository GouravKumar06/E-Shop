const express = require('express');
const { upload } = require('../multer');
const { createNewMessage } = require('../controller/message');
const router = express.Router();

router.post("/create-new-message",upload.array('images'),createNewMessage)


module.exports = router
