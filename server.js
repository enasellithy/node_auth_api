const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./db.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { requireAuth } = require('./app/middleware/authMiddleware');

mongoose.connect(dbConfig.url,{
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes/user.routes')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// app.get('/welcome',requireAuth, (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});