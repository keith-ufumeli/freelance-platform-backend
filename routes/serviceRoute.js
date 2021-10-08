const express = require('express')
const { requireSignIn } = require('../middleware')
const Service = require('../models/Service')
const User = require('../models/User')
const router = express.Router()

//add single service
// post request
// /api/v1/add
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

//get sinlge service
// get request
// /api/v1/single/:id
router.get('/single/:id', async (req,res, next)=>{
    try {
        const {id} = req.params
        Service.findOne({_id: id}).then(async (service)=>{
            const user = await User.findOne({_id: service.owner})
            return res.status(200).json({service: {
                displayName: user.displayName,
                photoURL: user.photoURL,
                price: service.price,
                price_type: service.price_type,
                description: service.description,
                tags: service.tags,
                createdAt: service.createdAt,
                owner: service.owner,
                _id: service._id
            }})
        })
        
    } catch (error) {
        next(error)
    }
})

//edit sinlge service
// patch request
// api/v1/edit/:id
router.patch('edit/:id', async (req, res, next) => {
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