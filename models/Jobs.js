const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    attachments: {
        type: Array
    },
    tags: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    views:{
        type: Array
    },
    createdBy:{
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'on-progress', 'finished'],
        default: 'pending'
    },
    bids:{
        type: Array,
    },
    being_done_by:{
        type: String,
        default: ''
    },
    payment_plan:{
        type: String,
        enum: ['once_off', 'periodically'],
        default: 'once_off'
    },
    amount_to_pay:{
        type: Number,
        default: 0
    },
    payment_period:{
        type: String,
        default: ''
    },
    category:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

JobsSchema.index({title: 'text', description: 'text'});

module.exports = mongoose.model('Job', JobsSchema)