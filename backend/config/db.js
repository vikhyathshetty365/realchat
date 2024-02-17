const mongoose = require('mongoose')

const connectDb = async () => {
    const connect = await mongoose.connect("mongodb+srv://vikhyathshetty365:CNCRWCFE0LY8v63F@cluster0.jrq1jp8.mongodb.net/?retryWrites=true&w=majority")

    console.log(connect.connection.host)
}

module.exports = connectDb