//esit user info
// /api/v1/patch
// patch rquest
exports.edit_User_Info = async(req,res, next)=>{
    try {
        console.log('exit user info')
    } catch (error) {
        next(error)
    }
}

//get request
//get single suer
// /api/v1/user/single/:id
exports.get_Single_user = async(req,res,next)=>{
    try {
        console.log('get single suer')
    } catch (error) {
        next(error)
    }
}

//get all sellers
// get reqwuest
// api/v1/user/sellers
exports.get_All_Sellers = async (req,res, next)=>{
    try {
        console.log('get all sellers')
    } catch (error) {
        next(error)
    }
}

//get all clients
// get request
// a/api/v1/user/clients
exports.get_ALl_Clients = async (req,res, next)=>{
    try {
        console.log('get all clients')
    } catch (error) {
        next(error)
    }
}

//delte user info
// delte request
// api/v1/user/delte/:id
exports.deleteUser = async (req, res, next)=>{
    try {
        console.log('delte user info')
    } catch (error) {
        next(error)
    }
}