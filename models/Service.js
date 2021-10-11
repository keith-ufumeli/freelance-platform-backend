const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    price:{
        type: Number,
        required: true
    },
    price_type:{
        type: String,
        enum: ['once_off', 'periodically'],
        default: 'once_off'
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    likes: {
        type: Array
    },
    stars: {
        type: Array
    },
    owner: {
        type: String,
        required: true
    },
    work_area_number:{
        type: String,
        default: ""
    },
    street_name:{
        type: String,
        default: ""
    },
    postal_code:{
        type: String,
        default: ""
    },
    work_area_name:{
        type: String,
        default: ""
    },
    full_address:{
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})
serviceSchema.index({description: 'text'});

module.exports = mongoose.model('Service', serviceSchema)