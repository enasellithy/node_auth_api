const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers["authorization"];

    if(token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if(err){
                return res.send(401).json({
                    'status': false,
                    'msg': 'Invalid token',
                })
            }
            else{
                next();
            }
        });
    }
    else{
        return res.status(401).json({
            'status': false,
            'msg': 'un authorization'
        })
    }
}

module.exports = { requireAuth };