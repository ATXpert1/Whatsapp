const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const usersBL = require('../models/usersBL')
const groupsBL = require('../models/groupsBL')
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
    let defaultGroups = ['631f032aa6f59f667b1e92d6', '631f035ca6f59f667b1e92dd', '631f03aea6f59f667b1e92ec']

    usersBL.signupUser(username, password)
        .then(userResp => {
            defaultGroups.forEach(groupId => {
                groupsBL.addUserToGroup(groupId, userResp._id)
                    .catch(err => {
                        res.status(501).send(err)
                    })
            })
            res.json('created user and added default groups')
        }).catch(err => res.status(501).send(err))
})
module.exports = router
