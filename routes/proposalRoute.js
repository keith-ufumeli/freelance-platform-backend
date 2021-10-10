const express = require('express')
const { requireSignIn } = require('../middleware')
const Jobs = require('../models/Jobs')
const Proposal = require('../models/Proposal')
const router = express.Router()

//create a proposal
router.post('/create/:id',requireSignIn, async(req,res,next)=>{
    const _user = req.user //user sending the proposal
    const {id} = req.params //id of the job
    const {body, pictures, amount, period} = req.body
    try {
        const _proposal = new Proposal({
            name: _user._id,
            job_id: id,
            body: body,
            pictures: pictures,
            amount,
            period
        })
        _proposal.save().then(async (proposal)=>{
            await Jobs.findOneAndUpdate({_id: id}, {$push : {bids: proposal._id}})
            res.status(200).json({message: 'Proposal sent'})
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router