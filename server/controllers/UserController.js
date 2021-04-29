const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController{
    
    static regis(req,res,next){
        const {email,password} = req.body
        User.create({email,password})
        .then((user) => {
            res.status(201).json({success:true, data:user})
        }).catch((err) => {
            console.log(err)
            next(err)
        });
    }

    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({where:{email}})
        .then((user) => {
            if(user && bcrypt.compareSync(password, user.password)){
                const access_token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET)
                res.status(200).json({success:true, access_token})
            }else{
                console.log('tidak ada')
            }
        }).catch((err) => {
            console.log(err)
            next(err)
        });
    }
}

module.exports = UserController