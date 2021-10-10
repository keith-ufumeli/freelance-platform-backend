const express = require('express')
const { requireSignIn } = require('../middleware')
const Contract = require('../models/Contract')
const User = require('../models/User')
const router = express.Router()

router.post('/create/:id', requireSignIn, async (req, res, next) => {
    const { id } = req.params  //id of the user to receive
    const _user = req.user // the sender of the contract
    try {
        const { firstname, lastname, title, company, email, phone_number, details, payment_type, payment_period, amount } = req.body

        //contract
        const new_contract = new Contract({
            createdBy: _user._id,
            sent_to: id,
            firstname,
            lastname,
            title,
            company,
            email,
            phone_number,
            details,
            payment_type,
            payment_period,
            amount
        })

        // save contrat and push to user documents
        new_contract.save().then(response => {
            User.findOneAndUpdate({ _id: id }, { $push: { contracts: response._id } }).then(() => {
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

//gert all user routesx
router.get('/user/:id',requireSignIn, async (req,res,next) =>{

})

module.exports = router