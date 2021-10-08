//esit user info
// /api/v1/patch

const User = require("../models/User");

// patch rquest
exports.edit_User_Info = async (req, res, next) => {
    try {
        const updateQuery = req.body
        const _new_user = await User.updateOne(
            { _id: req.params.id },
            { $set: updateQuery }
        );
        return res.status(200).json({ message: "User updated successfully", new_user: _new_user })
    } catch (error) {
        next(error)
    }
}

//get request
//get single suer
// /api/v1/user/single/:id
exports.get_Single_user = async (req, res, next) => {
    const { id } = req.params // user to get
    try {
        const _user = await User.findOne({ _id: id }) // document of uset o get

        return res.status(200).json({
            user: {
                address: _user.address,
                displayName: _user.displayName,
                createdAt: _user.createdAt,
                email: _user.email,
                gender: _user.gender,
                liked_posts: _user.liked_posts,
                phoneNumber: _user.phoneNumber,
                pictures: _user.pictures,
                posts: _user.posts,
                verified: _user.verified,
                photoURL: _user.photoURL,
                _id: _user._id,
                services: _user.services,
                jobs: _user.jobs
            }
        })
    } catch (error) {
        next(error)
    }
}

//get all sellers
// get reqwuest
// api/v1/user/sellers
exports.get_All_Sellers = async (req, res, next) => {
    try {
        console.log('get all sellers')
    } catch (error) {
        next(error)
    }
}

//get all clients
// get request
// a/api/v1/user/clients
exports.get_ALl_Clients = async (req, res, next) => {
    try {
        console.log('get all clients')
    } catch (error) {
        next(error)
    }
}

//delte user info
// delte request
// api/v1/user/delte/:id
exports.deleteUser = async (req, res, next) => {
    try {
        console.log('delte user info')
    } catch (error) {
        next(error)
    }
}