const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const usersBL = require('../models/usersBL')
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) {
        return res.status(400).send({ message: 'all input is required' })
    } else {
        usersBL.loginUser(username, password).then(resp => {
            var token = jwt.sign({ id: resp, username: username },
                process.env.RSA_PRIVATE_KEY,
                { expiresIn: 7200 }) //expires in 2 hours
            res.status(200).send({ auth: true, token: token, username: username, id: resp })
        }).catch(err => {
            res.status(401).send({ message: 'authentication failed' })
        })
    }
})
router.post('/signup', (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) {
        res.status(400).send({ message: 'all input is required' })
    } else {
        if (username.length && password.length > 5) {
            usersBL.signupUser(username, password).then(resp => {
                // return res.json(resp)
                return res.json('created user')
            }).catch(err => { res.json('cannot create user') })
        } else {
            res.status(400).send({ message: 'Invalid info' })
        }
    }
})
module.exports = router
