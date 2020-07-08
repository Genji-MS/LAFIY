const express = require('express')
const router = express.Router();

/** Route to get all messages. */
router.get('/', (req, res) => {
    res.render("index", {});
    /*Post.find({}).lean()
        .populate('author')
            .then(posts => {
                res.render("posts_index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
        });*/
    // TODO: Get all Message objects using `.find()`

    // TODO: Return the Message objects as a JSON list
})


module.exports = router