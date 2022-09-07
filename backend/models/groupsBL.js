const groupModel = require('./groupModel')
const messageModel = require('./groupModel')
const usersBL = require('./usersBL')
const createGroup = (groupName, createdById) => {
    return new Promise((resolve, reject) => {
        let group = new groupModel({
            name: groupName,
            admins: [createdById],
            participants: [createdById],
        })
        group.save((err, group) => {
            if (err) {
                reject(err)
            } else {
                usersBL.addGroupToUser(group._id, createdById).then(resp => {
                    resolve(group)
                }).catch(err => {
                    groupModel.findByIdAndDelete(group._id, (err, group) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve('deleted group, cannot add admin')
                        }
                    })
                })
            }
        })
    })
}
const addUserToGroup = (groupId, userId) => {
    return new Promise((resolve, reject) => {
        groupModel.findById(groupId, (err, group) => {
            if (err) {
                console.log('first error, groupsBL')
                reject(err)
            } else {
                let resp = group?.participants.find((user) => user._id.toString() == userId)
                if (resp) {
                    console.log('duplicate, groupsBL')
                    reject('duplicate group')
                } else {
                    group.participants.push(userId)
                    group.save((err) => {
                        if (err) {
                            console.log('after save, groupsBL')
                            reject(err)
                        } else {
                            usersBL.addGroupToUser(groupId, userId)
                                .then(userResp => resolve(group))
                                .catch(err => {
                                    console.log('last minute, groupsBL')
                                    reject(err)
                                })
                        } 
                    })
                }
            }
        })
    })
}
const addMessageToGroup = (groupId, message) => {
    return new Promise((resolve, reject) => {
        let messageObj = {
            from: message.from,
            content: message.content,
            username: message.username,
            userId: message.userId
        }
        groupModel.findByIdAndUpdate(groupId, { $push: { messages: messageObj } }, { new: true })
            .then(resp => resolve(resp.messages.at(-1)))
            .catch(err => reject(err))
    })
}

module.exports = { createGroup, addMessageToGroup, addUserToGroup }
