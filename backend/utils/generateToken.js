const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id: id }, "shetty1999", { expiresIn: "30d" })
}

module.exports = generateToken
