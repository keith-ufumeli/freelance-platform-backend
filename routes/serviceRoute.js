const express = require('express')
const { requireSignIn } = require('../middleware')
const Service = require('../models/Service')
const User = require('../models/User')
const router = express.Router()

//get single service
router.post('/add', requireSignIn, async (req, res, next) => {
    const _user = req.user
    try {
        const { price, price_type, category, description, tags, work_area_number, street_name, work_area_name, full_address, website, postal_code } = req.body

        const new_service = new Service({
            price,
            price_type,
            category,
            description,
            tags,
            owner: _user._id,
            work_area_number,
            street_name,
            postal_code,
            work_area_name,
            full_address,
            website
        })

        new_service.save().then(async (response) => {
            await User.findByIdAndUpdate({ _id: _user._id }, { $push: { services: response._id } })
            global.io.sockets.emit('service', response)
            return res.status(200).json({ message: 'Service Info saved' })
        }).catch(err => {
            next(err)
        })

        // res.json({work_area_name, street_name, work_area_number, full_address, website, price, tags})
        // re.json({postal_code})

    } catch (error) {

    }
})

router.patch('edit/:id', (req, res, next) => {
    try {
        const updateQuery = req.body
        const _new_service = await Service.updateOne(
            { _id: req.params.id },
            { $set: updateQuery }
        );
        global.io.sockets.emit('new_service', _new_service)
        return res.status(200).json({ message: "Service updated successfully", new_service: _new_service })
    } catch (error) {
        next(error)
    }
})

module.exports = router