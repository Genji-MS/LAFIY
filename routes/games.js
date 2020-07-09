const express = require('express')
const router = express.Router();
const Game = require('../models/game.js');

router.get('/new', async (req, res) => {
    try {
        return res.render('game-new', {})
    } catch (err) {
        return console.log(err);
    }
})

// CREATE
router.post('/new', (req, res) => {
    console.log(req.body);
    var game = new Game(req.body); 
    game
        .save()
        .then(game => {
            //return User.findById(req.user._id);
            res.redirect('/');
            //res.redirect(`/games/${game._id}`);
        })
        .catch(err => {
            console.log(err.message);
        });
});


module.exports = router