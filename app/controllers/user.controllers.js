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
            res.status(200).json({
                status: true,
                message: "User successfully created!",
                data: {
                    'user': {
                        'id': response._id,
                        'firstName': response.firstName,
                        'lastName': response.lastName,
                        'email': response.email
                    }
                }
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
    const jwtExpirySeconds = 30000;
    User.find({email:email}).exec().then(user=>{
        bcrypt.compare(password, user[0]['password'], (err, response) => {
            if(response){
                const token = jwt.sign({id:user[0]['_id'],email:user[0]['email'],type:'user'}, 'secret',{ expiresIn: '2h'});
                res.status(200).json({
                    status: true,
                    message: "User successfully created!",
                    data: {
                       'user': {
                           'id': user[0]['_id'],
                           'firstName': user[0]['firstName'],
                           'lastName': user[0]['lastName'],
                           'email': user[0]['email']
                       },
                        'token': token,
                        'expiresIn': jwtExpirySeconds
                    }
                });
            }
            else if(err){
                console.log('password not match');
            }
        });
    });
};

exports.welcome =  (req,res) => {
    console.log('Welcome');
};

exports.profile = (req, res) => {
    if (req.headers && req.headers.authorization) {

        console.log(req.headers.authorization);

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
    if (req.headers && req.headers.authorization) {

        try {
            return res.json("");
        } catch (error) {
            return next(error);
        }
    }
}