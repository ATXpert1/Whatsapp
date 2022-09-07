const express = require('express')
const router = express.Router()
const groupsBL = require('../models/groupsBL')
router.post('/createGroup', (req, res) => {
    let groupName = req.body.groupName
    let clientId = res.userId
    groupsBL.createGroup(groupName, clientId)
        .then(resp => res.json(resp))
        .catch(err => res.status(501).send(err))
})
router.post('/joinGroup', (req, res) => {
    let groupId = req.body.groupId
    let clientId = res.userId

    groupsBL.addUserToGroup(groupId, clientId)
        .then(resp => res.json(resp))
        .catch(err => res.status(501).send(err))
})
router.put('/updateGroup', (req, res) => {

})
router.delete('/deleteGroup', (req, res) => {

})
module.exports = router
