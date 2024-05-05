const Conversation = require('../model/conversation');


exports.createNewConversation = async (req, res) => {
    try{
        const {groupTitle,userId,sellerId} = req.body;

        const isConversationExist = await Conversation.findOne({groupTitle});

        if(isConversationExist){
            const conversation = isConversationExist;

            return res.status(200).json({
                success: true,
                conversation
            })
        }
        else{
            const conversation = await Conversation.create({
                members : [userId,sellerId],
                groupTitle: groupTitle
            });

            return res.status(201).json({
                success: true,
                conversation
            })
        }

       
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating conversation"
        })    
    }
}


//get seller conversations
exports.getSellerConversations = async (req, res) => {
    try{
        const conversations = await Conversation.find(
            {
                members :{ $in: [req.params.id] }
            }
        ).sort( { updatedAt : -1, createdAt : -1 })

        res.status(200).json({
            success: true,
            conversations
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting seller conversations"
        })
    }
}


