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
router.get("/:id", async function(req, res) {
    var currentUser = req.user;
    Game.findById(req.params.id).populate('challenges').lean()
    .then( async (game) => {
        if (currentUser){
            var player = await User.findOne({'_id' :currentUser._id}).lean()
            console.log(`fingers : ${player.fingers}`);
            console.log('checking matched IDs')
            for (const chalID of game.challenges){
                var choice_True = false;
                var choice_False = false;
                for(const finger of player.fingers){
                    console.log(`ChalID ${chalID._id} fingerID ${finger.challenge}`)
                    if (String(chalID._id) == String(finger.challenge)){
                        console.log(`matched ID`)
                        if (finger.choice == true){
                            choice_True = true;
                        }
                        else {
                            choice_False = true;
                        }
                        chalID.choice_True = choice_True;
                        chalID.choice_False = choice_False;
                        break;
                    }
                }
            }
            for (const chalID of game.challenges){
                console.log(`game data shows: ${chalID.choice_True} ${chalID.choice_False}`)
            }
        }
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

    //if is challenge existing
    //else 

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

router.put("/:chalId/finger-up", async function (req,res) {
    var currentUser = req.user;
    var challengeID = req.params.chalId
    var update = "worked perfectly";
    var player = await User.findOne({'_id': currentUser._id, 'fingers.challenge': challengeID})
    if (!player){
        console.log(`no game found, creating new entry`)
        player = await User.findOne({'_id': currentUser._id})
        player.fingers.push({challenge: challengeID, choice: true})
        update = await player.save()
        //res.redirect(`/games/`);
    }
    else {
        console.log(`existing game found`)
        //unable to update
        // player = await player.fingers.findOneAndUpdate({'fingers.challenge': challengeID}, {'fingers.choice': true}, {new: true, upsert: true})
        // update = await player.save()
    }
    console.log(update);
})


router.put("/:chalId/finger-down", async function (req,res) {
    var currentUser = req.user;
    var challengeID = req.params.chalId
    var update = "worked perfectly";
    var player = await User.findOne({'_id': currentUser._id, 'fingers.challenge': challengeID})
    if (!player){
        console.log(`no game found, creating new entry`)
        player = await User.findOne({'_id': currentUser._id})
        player.fingers.push({challenge: challengeID, choice: false})
        update = await player.save()
    }
    else {
        console.log(`existing game found`)
        //unable to update
        // player = await player.fingers.findOneAndUpdate({'fingers.challenge': challengeID}, {'fingers.choice': false}, {new: true, upsert: true})
        // update = await player.save()
    }
    console.log(update);
})

router.get("/:id/delete-game", async (req,res) => {
    const message = await Game
        .findByIdAndRemove(req.params.id)
        .then(() => 'Game deleted');
        res.redirect('/');
})

router.delete("/:id/delete-chal", function(req,res){
    console.log("route to delete challenge accepted")
    
})

module.exports = router