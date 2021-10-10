const mongoose = require('mongoose')

const proposalSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    job_id:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    pictures: Array,
    period: {
        type: String
    },
    amount: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Proposal', proposalSchema)