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
        console.log(err)
        res.status(401).send({ message: 'authentication failed' })
    })
})
router.post('/signup', (req, res) => {
    const { username, password } = req.body
    let defaultGroups = ['6339926e87e588f2af3cc68c', '6339927987e588f2af3cc691', '6339927f87e588f2af3cc696']

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
