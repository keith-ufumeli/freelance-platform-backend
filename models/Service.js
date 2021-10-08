const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    price:{
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    description: {
        type: Number,
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
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Service', serviceSchema)