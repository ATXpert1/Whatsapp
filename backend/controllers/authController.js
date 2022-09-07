const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const usersBL = require('../models/usersBL')
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    usersBL.loginUser(username, password).then(resp => {
        var token = jwt.sign({ id: resp, username: username },
            process.env.RSA_PRIVATE_KEY,
            { expiresIn: 86400 }) //expires in 24 hours
        res.status(200).send({ auth: true, token: token, username: username, id: resp })
    }).catch(err => {
        res.status(401).send({ message: 'authentication failed' })
    })
})
router.post('/signup', (req, res) => {
    const { username, password } = req.body
    usersBL.signupUser(username, password)
        .then(resp => res.json('created user'))
        .catch(err => res.status(501).send(err))
})
module.exports = router
