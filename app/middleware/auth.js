const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return res.status(403).json({
            'status': false,
            'msg': 'A token is required for authentication',
        });
    }
    try {
        console.log(jwt.verify(token, 'secret'));
        const decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        // req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            'status': false,
            'msg': 'Invalid Token',
        });
    }
    return next();
};

module.exports = verifyToken;