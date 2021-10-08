// regsiter user
//post request
// /api/vq/auth/register
exports.regsiterUser = async(req,res,next)=>{
    try {
        console.log('register user jere')
    } catch (error) {
        next(error)
    }
}

//login user
//post request
// /api/vq/auth/login
exports.loginUser = async(req,res, next)=>{
    try {
        console.log('login user here')
    } catch (error) {
        next(error)
    }
}

//logout user
//post request
// /api/vq/auth/logout
exports.Logoutuser = async(req,res, next)=>{
    try {
        console.group('logout user')
    } catch (error) {
        next(error)
    }
}