const Message = require("../model/messages");

exports.createNewMessage = async (req, res) => {
    try{
        const messageData = req.body;

        if(req.files)
        {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            
            messageData.images = imageUrls;
           
        }

        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.user.sender;

        const message = new Message({
            conversationId: messageData.conversationId,
            sender: messageData.sender,
            images: messageData.images ? messageData.images : undefined,
        })

        await message.save();

        return res.status(201).json({
            success: true,
            message,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while creating message"
        })
    }
}