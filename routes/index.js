const express = require('express')
const gameRoutes = require('./games')
const userRoutes = require('./sign')
const Game = require('../models/game');
const User = require('../models/user');

const router = express.Router()

router.get('/', (req, res) => {
    var currentUser = req.user;
    Game.find({}).lean()
    .then(games => {
        res.render("index", {games, currentUser});
    })
    .catch(err => {
        console.log(err.message);
    });
})

router.use('/games', gameRoutes)
router.use('/sign', userRoutes)

module.exports = router