const express = require('express')
const router = express.Router()
const groupsBL = require('../models/groupsBL')
router.post('/createGroup', (req, res) => {
    let groupName = req.body.groupName
    let clientId = res.userId
    let username = res.username
    groupsBL.createGroup(groupName, clientId, username)
        .then(resp => res.json(resp))
        .catch(err => res.status(501).send(err))
})
router.post('/joinGroup', (req, res) => {
    let groupId = req.body.groupId
    let userToAddId = req.body.userToAddId
    groupsBL.addUserToGroup(groupId, userToAddId)
        .then(resp => res.json(resp))
        .catch(err => res.status(501).send(err))
})
router.put('/updateGroup', (req, res) => {

})
router.post('/leaveUserFromGroup', (req, res) => {
    let groupId = req.body.groupId
    let userToRemoveId = req.body.userToRemoveId
    let userId = res.userId
    groupsBL.removeUserFromGroup(groupId, userId, userToRemoveId)
        .then(resp => res.json('removed user from group'))
        .catch(err => {
            res.status(404).send(err)
        })
})
module.exports = router
