const express = require('express')
const { sendMessage, getMessage } = require('../controller/messageController')
const auth = require('../utils/auth')
const router = express.Router()

router.route('/send').post(auth, sendMessage)
router.route('/getmessages').get(auth, getMessage)


module.exports = router

