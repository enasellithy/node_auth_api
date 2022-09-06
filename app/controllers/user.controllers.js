const User = require('../models/usermodel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {requireAuth} = require("../middleware/authMiddleware");

exports.singup = (req,res) => {

    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save().then((response) => {
            res.status(201).json({
                message: "User successfully created!",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const jwtKey = "secret"
    const jwtExpirySeconds = 30000
    User.find({email:email}).exec().then(result=>{

        console.log(result);

        bcrypt.compare(password,user[0]['password'],(err,res)=>{
            console.log(result[0]);
            console.log(result[0]['email']);
        //     if(err){
        //         console.log('password not match')
        //     }
        //     if(result){
        //         const token = jwt.sign({id:user._id,username:user.email,type:'user'},
        //             'secret',{ expiresIn: '2h'})
        //
        //         // user
        //         res.status(200).json({
        //             'status': true,
        //             'user': {
        //                 '_id': results[0]['_id'],
        //                 'email': results[0]['email'],
        //             },
        //             'token': token,
        //             'expiresIn': jwtExpirySeconds
        //         });
        //     }
        });

    });
};

exports.welcome =  (req,res) => {
    console.log('Welcome');
};

exports.profile = (req, res) => {
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization, check;
        try {
            check = jwt.verify(authorization, 'secret');
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        // Fetch the user by id
        User.findOne({_id: check.id}).then(function(user){
            return res.status(200).json({
                'status': true,
                'data': {
                    'user': {
                        'id': user._id,
                        'name': user.firstName + user.lastName,
                        'email': user.email,
                    }
                }
            });
        });
    }
}

exports.logout = (req,res) => {

}