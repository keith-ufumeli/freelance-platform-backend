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
router.patch('edit/:id', edit_A_Service)

module.exports = router