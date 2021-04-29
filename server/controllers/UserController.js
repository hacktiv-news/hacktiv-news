class UserController{
    
    static regis(req,res,next){
        res.send('regis')
    }

    static login(req,res,next){
        res.send('login')
    }
}

module.exports = UserController