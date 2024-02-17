const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: 'string' },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }

})


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
