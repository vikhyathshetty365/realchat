const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const { createChat, getChats, createGroup } = require('../controller/chatController')

router.route('/addchat').post(auth, createChat)
router.route('/getChat').get(auth, getChats)
router.route('/creategroup').post(auth, createGroup)
module.exports = router