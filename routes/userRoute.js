const express = require('express')
const { edit_User_Info, get_Single_user, get_All_Sellers, get_ALl_Clients, deleteUser } = require('../controllers/userControllers')
const { requireSignIn } = require('../middleware')
const router = express.Router()

//esit user info
// /api/v1/patch
// patch rquest
router.patch('/edit/:id',requireSignIn, edit_User_Info)

//get request
//get single suer
// /api/v1/user/single/:id
router.get('/single/:id', get_Single_user)

//get all sellers
// get reqwuest
// api/v1/user/sellers
router.get('/sellers', get_All_Sellers)

//get all clients
// get request
// a/api/v1/user/clients
router.get('/clients', get_ALl_Clients)

//delte user info
// delte request
// api/v1/user/delte/:id
router.delete('/delete/:id',requireSignIn, deleteUser)

module.exports = router