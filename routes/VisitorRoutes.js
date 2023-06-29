const express = require('express')
const asyncHandler = require('express-async-handler')
const VisitorModel = require('../models/VisitorModel.js')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const visitorRouter = express.Router()

visitorRouter.post('/interests', asyncHandler(async(req, res) => {
    const {fullname, email, country, phone, address, option, plotDetails, plotID} = req.body

    //Email 
    const filePath = path.join(__dirname, '../emails/main.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        fullname: fullname
    };

    const htmlToSend = template(replacements);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'addsamuel355@gmail.com',
          pass: 'ljhxurlbacagrtuc'
        }
    });

    var mailOptions = {
        from: 'addsamuel355@gmail.com',
        to: email,
        subject: 'Plot Sending Email',
        html: htmlToSend
    };

    try {
        const visitor = await VisitorModel.create({
            fullname,
            email,
            country,
            phone,
            address,
            option,
            plotDetails,
            plotID
        })

        if(visitor){
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    res.json({message: 'Thank you for your message, kindly check your email or spam box for the necessary action'})
                    res.status(200).send(info.response)
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(201).json(visitor)
        }else{
            res.status(401).json({message: 'Error occurred saving visitor details'})
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

}))

module.exports = visitorRouter