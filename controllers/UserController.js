const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

class UserController{
    
    static regis(req,res,next){
        const {email,password} = req.body
        User.create({email,password})
        .then((user) => {
            const msg = {
                to: user.email, // Change to your recipient
                from: 'tugashacktiv8@gmail.com', // Change to your verified sender
                subject: 'Notifikasi Registrasi',
                text: `Halo ${user.email}. Terima kasih telah registrasi aplikasi Hacktiv8 news.`,
                html: `Halo ${user.email}. Terima kasih telah registrasi aplikasi Hacktiv8 news.`,
              }
              
            sgMail
                .send(msg)
                .then((response) => {
                  console.log(response[0].statusCode)
                  console.log(response[0].headers)
                })
                .catch((error) => {
                  console.error(error)
                })
            res.status(201).json({success:true, data:user})
        }).catch((err) => {
            next(err)
        });
    }

    static login(req,res,next){
        const {email,password} = req.body
        if(!email || !password){
            return next({name : 'LOGIN_FAIL'})
        }else{
            User.findOne({where:{email}})
            .then((user) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const access_token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET)
                    res.status(200).json({success:true, access_token})
                }else{
                    console.log('tidak ada')
                }
            }).catch((err) => {
                next(err)
            });
        }
    }


    static googleLogin(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const token = req.body.token
        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        console.log(payload)
        User.findOne({
            where:{
                email:payload.email
            }
        })
        .then((user) => {
            if(!user){
                return User.create({email:payload.email, password:process.env.DEFAULT_PASSWORD})
            }else{
                return user
            }
        })
        .then((user) => {
            const access_token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET)
            return res.status(200).json({access_token})
        })
        .catch((err) => {
            next(err)
        });
        }
        verify().catch(console.error);
    }
}

module.exports = UserController