const jwt = require('jsonwebtoken')
const user = require('../Model/userModel')
const Auth = async (req, res, next) => {

    let token

    if (req.headers && req.headers.authorization) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, "shetty1999")


            req.user = await user.findById({ _id: decoded.id })
            console.log(req.user)
            next()

        }
        catch (err) {

            return res.status(200).json({ error: err.message })

        }



    }
    if (!token) return res.status(401).json({ error: "Token not found" })



}

module.exports = Auth