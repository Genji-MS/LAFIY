const express = require('express')
const gameRoutes = require('./games.js')
const Game = require('../models/game.js');

const router = express.Router()

router.get('/', (req, res) => {
    Game.find({}).lean()
    .then(games => {
        res.render("index", {games});
    })
    .catch(err => {
        console.log(err.message);
    });
})

router.use('/games', gameRoutes)

module.exports = router