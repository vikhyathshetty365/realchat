
const user = require('../Model/userModel')
const genToken = require('../utils/generateToken')
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(403).json({ error: 'Invalid email or password' })
        }

        userExist = await user.findOne({ email: email })
        if (!userExist) {
            return res.status(400).json({ error: 'User does not exist' })
        }

        if (await userExist.ComparePass(password)) {

            return res.status(200).json({
                name: userExist.name,
                email: userExist.email,
                token: genToken(userExist._id)
            })

        }
        else {

            return res.status(403).json({ error: 'invalid Credentials' })
        }



    }
    catch (err) {

        return res.status(401).json({ error: err.message })

    }

}



const RegisterUser = async (req, res) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password) {
            return res.status(401).json({ error: 'Please enter email and Password' })
        }



        let User = await user.findOne({ email: email });

        if (User) {
            return res.status(400).json({ error: 'user already exists' })
        }


        User = await user.create({ email: email, password: password, name: name })

        return res.status(200).json({ id: User._id, name: User.name, email: User.email, password: User.password, token: genToken(User._id) })

    }
    catch (err) {
        return res.status(401).json({ error: err.message })

    }
}

const getUsers = async (req, res) => {
    try {


        const key = req.query.key ? {
            $or: [
                {
                    name: { $regex: req.query.key, $options: "i" },
                    email: { $regex: req.query.key, $options: "i" }

                }
            ]
        } : {}

        const User = await user.find(key).find({ _id: { $ne: req.user._id } })

        return res.status(200).json(User)
    }
    catch (err) {
        return res.status(200).json({ error: err.message })

    }
}
module.exports = { userLogin, RegisterUser, getUsers }