const express = require('express')
const { createA_Service, get_A_SInlge_Service, edit_A_Service } = require('../controllers/serviceController')
const { requireSignIn } = require('../middleware')
const Service = require('../models/Service')
const User = require('../models/User')
const router = express.Router()

//add single service
// post request
// /api/v1/add
router.post('/add', requireSignIn, createA_Service)

//get sinlge service
// get request
// /api/v1/single/:id
router.get('/single/:id', get_A_SInlge_Service)

//edit sinlge service
// patch request
// api/v1/edit/:id
router.patch('/edit/:id', edit_A_Service)

//get all services
// gert rewquest
// /api/v1/service/all
router.get('/all', async (req, res, next) => {
    try {
        const _services = await Service.find({})
        const all_services = []
        for (var i = 0; i < _services.length; i++) {
            const _service_user = await User.findOne({ _id: _services[i].owner })
            all_services.push({
                displayName: _service_user.displayName,
                _id: _services[i]._id,
                category: _services[i].category,
                price_type: _services[i].price_type,
                description: _services[i].description,
                price: _services[i].price,
                tags: _services[i].tags,
                owner: _services[i].owner,
                createdAt: _services[i].createdAt,
                photoURL: _service_user.photoURL,
                user_verified: _service_user.verified,
            })

        }
        return res.status(200).json({ services: all_services })
    } catch (error) {
        next(error)
    }
})

module.exports = router