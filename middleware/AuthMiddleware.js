const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel.js')

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await UserModel.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(404).json({message: 'Not authorized, token failed'})
        } 
    }
    
    if(!token){
        res.status(400).json({message: 'Not authorized, no token'})
    }
})

module.exports = protect