const express = require('express')
const postRoutes = require('./posts.js')

const router = express.Router()

router.get('/', (req, res) => {
    res.render("index", {});
})
router.use('/posts', postRoutes)

module.exports = router