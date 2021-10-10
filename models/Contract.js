const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required:true
    },
    sent_to: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String,
    },
    title: {
        type: String
    },
    company: {
        type: String
    },
    email: {
        type: String
    },
    phone_numner: {
        type: String
    },
    details: {
        type: String
    },
    payment_type: {
        type: String,
    },
    payment_period: {
        type: String
    },
    amount: {
        type: Number
    },
    signed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'pending'
    },
    period_of_contract:{
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contract', contractSchema)