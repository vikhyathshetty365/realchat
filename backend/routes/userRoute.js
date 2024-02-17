const express = require('express')
const { userLogin, RegisterUser, getUsers } = require('../controller/userController')
const auth = require('../utils/auth')
const router = express.Router();

router.route('/login').post(userLogin)
router.route('/register').post(RegisterUser)
router.route('/getusers').get(auth, getUsers)
module.exports = router