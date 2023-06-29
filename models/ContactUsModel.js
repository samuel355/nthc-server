const mongoose = require('mongoose')

const ContactUsSchema = mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    message: String,
}, {timestamps: true})

const contactUsModel = mongoose.model('Contact_Us', ContactUsSchema)
module.exports = contactUsModel