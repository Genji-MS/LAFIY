const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//allows use of shorter extension .hbs instead of .handlebars
exphbs = require('express-handlebars'),
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');



// Add after body parser initialization!
//app.use(expressValidator());
// Database Setup
// TODO

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