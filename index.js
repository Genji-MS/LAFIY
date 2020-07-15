const express = require('express')
const app = express()
const bodyParser = require('body-parser');

require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.insertToken === "undefined" || req.cookies.insertToken === null) {
    req.user = null;
    } else {
    var token = req.cookies.insertToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    }
    // console.log(token);
    next();
};

app.use(express.static('public'));
app.use(cookieParser());

//allows use of shorter extension .hbs instead of .handlebars
exphbs = require('express-handlebars'),
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Use Body Parserx§
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(checkAuth);

// Database Setup
require('./data/server');
require('./models/game');
require('./models/challenge');

// Routes
const router = require('./routes/index.js')
app.use(router)

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
//for testing with mocha
module.exports = app;