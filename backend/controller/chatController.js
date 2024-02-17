const User = require('../Model/chatModal')
const Chat = require('../Model/chatModal')
const createChat = async (req, res) => {
    try {

        const { userId } = req.body

        if (!userId) {
            return res.status(404).json({ error: 'user not found' })
        }

        console.log(userId)

        console.log(`output1---->${req.user._id}`)
        let isChat = await Chat.find({
            isgroup: false,
            $and: [{ users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }]
        }).populate("users", "name email")

        console.log(`output2----->${isChat}`)
        isChat = await User.populate(isChat, {
            path: "lastchat.sender",
            select: "name email"
        })

        console.log(isChat.length)
        if (isChat.length > 0) {
            return res.status(200).json(isChat)
        }
        else {
            const chatData = {
                chatname: "sender",
                isgroup: false,
                users: [req.user._id, userId]
            }

            try {
                console.log('hi')
                const chat = await Chat.create(chatData).populate("users", "-password")

                console.log(chat)
                return res.status(200).json(chat)
            }
            catch (err) {
                return res.status(400).json(err)
            }




        }





    }
    catch (err) {
        res.status(401).json(err)
    }
}


const getChats = async (req, res, next) => {

    try {
        let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password").populate("groupadmin", "-password").populate("lastchat")


        chats = await User.populate(chats, {
            path: 'lastchat.sender',
            select: 'name email'
        })
        // .populate("lastmessage")
        // .sort({ updatedAt: -1 }).then(async (res) => await User.populate(res, {
        //     path: "lastmessage.sender",
        //     select: "name email"
        // }))
        return res.status(200).json(chats)
    }
    catch (err) {

        return res.status(400).json(err.message)

    }




}


const createGroup = async (req, res) => {
    try {

        const { users, name } = req.body

        if (!users || !name) return res.status(400).json(err.message)
        users = JSON.parse(req.users)

        if (users.length < 2)
            return res.status(200).json({ err: 'more than 2 participants required' })

        users.push(req.user._id)

        const group = await Chat.crate({
            chatname: name,
            isgroup: true,
            users: users,
            groupadmin: req.user
        }).populate("users", "-password").populate("groupadmin", "-password")

        return res.status(200).json(group)

    }
    catch (err) {

        return res.status(400).json({ err: err })

    }
}

module.exports = { createChat, getChats, createGroup }