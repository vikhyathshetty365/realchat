const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.Schema({

    name: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },


})

User.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

User.methods.ComparePass = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

const userSchema = mongoose.model("User", User)
module.exports = userSchema