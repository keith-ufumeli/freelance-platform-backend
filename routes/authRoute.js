const express = require('express')
const { regsiterUser, loginUser, Logoutuser } = require('../controllers/authController')
const router = express.router()

//register user
//post request
// /api/vq/auth/register
router.post('/register',regsiterUser)

// login user
//post request
// /api/vq/auth/login
router.post('/login', loginUser)

//lofout suer
//post request
// /api/vq/auth/logout
router.post('/logout', Logoutuser)

module.exports = router