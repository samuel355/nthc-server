const mongoose = require ("mongoose")

const PlotDetailSchema = mongoose.Schema({
    type: { type: String, enum: ['Feature']},
    geometry: {
        type: { type: String, enum: ['Polygon']},
        coordinates: { type: [[[Number]]]},
    },
    properties: {
        ObjectID: {type: Number,required: true, unique: true},
        Plot_Number: {type: String},
        Plot_Size: {type: String},
        Plot_Status: {type: String},
        Plot_Detail: {type: String},
    },
    client: {
        fullName: {type: String},
        email: {type: String},
        country: {type: String},
        address: {type: String},
        plotInfo:{type: String},
        phone: {type: Number},
        status: {type: String},
        agent: {type: String},
        totalAmount: {type: Number},
        paidAmount: {type: Number},
        remainingAmount: {type: Number},
    }
    
},{timestamps:true})

const PlotDetailModel = mongoose.model('PlotDetails', PlotDetailSchema)
module.exports = PlotDetailModel