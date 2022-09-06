const users = require("../controllers/user.controllers");
const { requireAuth } = require('../middleware/authMiddleware');

module.exports = (app) => {
    const users = require('../controllers/user.controllers');
    app.post('/singup',[
        users.singup
    ]);

    app.post('/login',[
        users.login
    ]);

    app.get('/profile', requireAuth ,[
        users.profile
    ]);

    app.post('/logout', requireAuth ,[
        users.logout
    ]);

}