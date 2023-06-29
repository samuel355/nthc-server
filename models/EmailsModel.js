const mongoose = require('mongoose')

const EmailsSchema = mongoose.Schema({
    email: String
}, {timestamps: true})

const EmailModel = mongoose.model('emails', EmailsSchema)
module.exports = EmailModel