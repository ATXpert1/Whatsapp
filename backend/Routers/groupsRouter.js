const express = require('express')
const router = express.Router()
const groupsBL = require('../models/groupsBL')

router.post('/createGroup', (req, res) => {
    let groupName = req.body.groupName
    let clientId = res.userId
    groupsBL.createGroup(groupName, clientId).then(resp => {
        return res.json('created group')
    }).catch(err=>{
        return res.json('cannot create group')
    })
})
router.put('/updateGroup', (req, res)=>{
    
})
router.delete('/deleteGroup', (req, res)=>{
    
})
module.exports = router
