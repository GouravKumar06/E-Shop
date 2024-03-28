const express = require('express');
const { createEvent, getAllEventsShopId, deleteShopEventId, getAllEvents } = require('../controller/event');
const { upload } = require('../multer');
const { shopAuthenticated } = require('../middleware/auth');

const router = express.Router();


router.post("/create-event",upload.none(),createEvent);
router.get("/get-all-events-shop/:id",getAllEventsShopId);
router.delete("/deleteShopEvent/:id",shopAuthenticated,deleteShopEventId);
router.get("/get-all-events",getAllEvents)


module.exports = router;
