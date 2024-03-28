const Event = require("../model/event");
const Shop = require("../model/shop");



exports.createEvent = async (req, res) => {
    try{
        const {shopId} = req.body
        const shop = await Shop.findById(shopId);
        if(!shop)
        {
            return res.status(400).json({
                success: false,
                message: "Shop Id  not found"
            })
        }
        else{
            const eventData = req.body;
            eventData.shop = shop;
            const event = await Event.create(eventData);
            return res.status(201).json({
                success: true,
                message: "Event created successfully",
                event
            })
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating event"
        })
    }
}

//get all events of shop on the basis of shop id
exports.getAllEventsShopId = async(req,res) =>{
    try{
        const events = await Event.find({shopId : req.params.id});
        return res.status(200).json({
            success:true,
            events
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while getting all events"
        })
    }
}


exports.deleteShopEventId = async (req, res) => {
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event)
        {
            return res.status(500).json({
                success: false,
                message: "Event not found with this id"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while deleting event"
        })
    }
}


exports.getAllEvents = async(req,res) =>{
    try{
        const allEvents = await Event.find();
        return res.status(200).json({
            success:true,
            allEvents
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while getting all events"
        })
    }
}