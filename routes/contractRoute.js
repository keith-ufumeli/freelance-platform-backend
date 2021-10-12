const express = require('express')
const { requireSignIn } = require('../middleware')
const Contract = require('../models/Contract')
const User = require('../models/User')
const router = express.Router()
const Service = require('../models/Service')

router.post('/create/:id', requireSignIn, async (req, res, next) => {
    const { id } = req.params  //id of the user to receive
    const _user = req.user // the sender of the contract
    try {
        const { firstname, lastname, title, company, email, phone_number, details, payment_type, payment_period, amount, period_of_contract } = req.body
        const receiver = await Service.findOne({ _id: id })

        //contract
        const new_contract = new Contract({
            createdBy: _user._id,
            sent_to: receiver.owner,
            firstname,
            lastname,
            title,
            company,
            email,
            phone_number,
            details,
            payment_type,
            payment_period,
            amount,
            period_of_contract
        })

        // save contrat and push to user documents
        new_contract.save().then(response => {
            User.findOneAndUpdate({ _id: receiver.owner }, { $push: { contracts: response._id } }).then(() => {
                User.findOneAndUpdate({ _id: _user._id }, { $push: { contracts: response._id } }).then(() => {
                    res.status(200).json({ response })
                })
            })
        }).catch(error => {
            next(error)
        })

    } catch (error) {
        next(error)
    }
})

//gert all user contracts
router.get('/user', requireSignIn, async (req, res, next) => {
    const { status } = req.body
    const _user = req.user
    try {
        const _contracts = await Contract.find({ sent_to: _user._id })
        res.status(200).json({ contracts: _contracts })
    } catch (error) {
        next(error)
    }
})

router.get('/single/:id', requireSignIn, async (req, res, next) => {
    const { id } = req.params
    try {
        const _contract = await Contract.findOne({ _id: id })
        return res.status(200).json({ contract: _contract })
    } catch (error) {
        next(error)
    }
})

//respons to a contract
router.patch('/response/:id', requireSignIn, async (req, res, next) => {
    const { id } = req.params
    const { status, signed } = req.body
    try {
        const new_contract = await Contract.findByIdAndUpdate({ _id: id }, { status: 'reacted', signed: signed })
        res.status(200).json({ contract: new_contract })
    } catch (error) {
        next(error)
    }
})

module.exports = router