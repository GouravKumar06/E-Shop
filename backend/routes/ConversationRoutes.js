const express = require('express');
const router = express.Router();
const { createNewConversation, getSellerConversations } = require('../controller/conversation');
const { shopAuthenticated } = require('../middleware/auth');

router.post("/create-new-conversation",createNewConversation);
router.get("/get-all-conversation-seller/:id",shopAuthenticated,getSellerConversations)

module.exports = router

