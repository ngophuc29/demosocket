const express = require('express')

const router = express.Router()

router
    .route("/")
    .get((req, res) => {
        return res.render('login.ejs')
    })

router
    .route("/chat")
    .get((req, res) => {
        return res.render('chat.ejs')
    })

module.exports = router