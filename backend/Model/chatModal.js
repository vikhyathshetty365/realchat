const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    chatname: { type: 'string', required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isgroup: { type: Boolean, default: false },
    lastchat: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupadmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

const chat = mongoose.model("Chat", chatSchema);
module.exports = chat