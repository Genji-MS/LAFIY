const express = require('express')
const router = express.Router();
const Game = require('../models/game');
const Challenge = require('../models/challenge');
const User = require('../models/user');

// CREATE GET
router.get('/new', async (req, res) => {
    var currentUser = req.user;
    try {
        return res.render('game-new', {currentUser})
    } catch (err) {
        return console.log(err);
    }
})

// CREATE POST
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

// GET ONE
router.get("/:id", function(req, res) {
    var currentUser = req.user;
    Game.findById(req.params.id).populate('challenges').lean()
    .then((game) => {
        res.render('game-view', {game, currentUser})
    }).catch((err) => {
        console.log(err.message)
    });
});

// VIEW BY TOPIC
router.get("/n/:topic", function(req, res) {
    var currentUser = req.user;
    Game.find({ topic: req.params.topic }).lean()
    .then(games => {
        res.render("topic", { games, currentUser, topic:req.params.topic });
    })
    .catch(err => {
        console.log(err);
    });
});

// CREATE Comment
router.post("/:id/challenge", function (req, res) {
    console.log(req.body);
    const challenge = new Challenge(req.body);
    //challenge.challenge = req.body.challenge;
    Game.findById(req.params.id)
        .then(game => {
            challenge.save()
            game.challenges.push(challenge);
            game.save()                    
            res.redirect(`/games/${req.params.id}`);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router