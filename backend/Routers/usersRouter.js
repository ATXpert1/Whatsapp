const express = require('express')
const router = express.Router()
const usersBL = require('../models/usersBL')
router.get('/getUserGroups', async(req, res) => {
    let clientId = res.userId
    usersBL.getGroupsOfUser(clientId).then(resp => {
        return res.json(resp)
    }).catch(err=>{console.log(err)})
})
module.exports = router
