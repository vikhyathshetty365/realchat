

const Chat = require('../Model/chatModal')
const User = require('../Model/userModel')
const Message = require('../Model/MessageModel')
const sendMessage = async (req, res, next) => {
    try {

        const { chatId, content } = req.body;

        if (!chatId || !content) {
            res.status(404).json({ error: 'chat not found' });
        }

        let msg = {
            sender: req.user._id,
            content: content,
            chat: chatId,

        }
        let createdmessage;

        let message = await Message.create(msg)
        createdmessage = await Message.findById(message._id).populate("sender").populate("chat").exec()
        // message = message.populate("chat");
        ///createdmessage = await createdmessage.populate("chat.users").exec()
        console.log(createdmessage)
        createdmessage = await User.populate(createdmessage, {
            path: "chat.users",
            select: 'name email'
        })




        //createdmessage = createdmessage.populate("chat.users", "name email")
        const chat = await Chat.findById(chatId)
        chat.lastchat = createdmessage


        await chat.save();

        return res.status(201).json(createdmessage)



    }
    catch (err) {
        return res.status(401).json({ err: err.message })
    }

}


const getMessage = async (req, res, next) => {
    try {
        const { chatId } = req.body

        console.log(`chatId-${chatId}`)
        let chats = await Message.find({ chat: chatId }).populate("sender", "name email").populate("chat")
        chats = await User.populate(chats, {
            path: "chat.users",
            select: "name email"
        })

        return res.status(201).json(chats)

    }
    catch (err) {
        res.status(400).json(err)
    }
}

module.exports = { sendMessage, getMessage };