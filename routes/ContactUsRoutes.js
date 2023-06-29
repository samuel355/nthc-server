const express = require('express')
const asyncHandler = require('express-async-handler')
const contactUsModel = require('../models/ContactUsModel')
const EmailModel = require('../models/EmailsModel')

const contactUsRouter = express.Router()

//Send Message through Contact Us Form
contactUsRouter.post('/contact-us', asyncHandler(async(req, res) => {
    const {fullname, email, phone, message} = req.body

    try {
        const sendMessage = await contactUsModel.create({
            fullname, email, phone, message
        })
        if(sendMessage) {
            res.status(201).json(sendMessage)
        }else{
            res.status(401).json({message: 'Error occurred sending message.'})
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}))

//Subscribe to newsLetter
contactUsRouter.post('/subscribe-news-letter', asyncHandler(async(req, res) => {
    const {email} = req.body;

    try {
        const findEmail = await EmailModel.findOne({email})
        if(findEmail) {
            return res.status(404).json({message: `Sorry you have already subscribed to this news letter with this email - ${email}`})
        }else{
            const sub = await EmailModel.create({email});
            if(sub){
                return res.status(201).json(sub)
            }else{
                return res.status(404).json({message: 'Sorry error occurred while subscribing'})
            }
        }
        
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}))

//Fetch all contact us people
contactUsRouter.get('/contact-us/all', asyncHandler(async(req, res) => {
    try {
        const allContactUs = await contactUsModel.find()
        if(allContactUs){
            res.status(200).json(allContactUs)
        }else{
            res.json(404).json({message: 'Sorry an error occurred fetching the data'})
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}))

//Fetch all subscribers
contactUsRouter.get('/subscribe-news-letter/all', asyncHandler(async(req, res) => {
    try {
        const allSubs = await EmailModel.find()
        if(allSubs){
            res.status(200).json(allSubs)
        }else{
            res.json(404).json({message: 'Sorry an error occurred fetching the data'})
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}))


module.exports = contactUsRouter;