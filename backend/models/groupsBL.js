const groupModel = require('./groupModel')
const messageModel = require('./groupModel')
const userModel = require('./userModel')
const usersBL = require('./usersBL')
const createGroup = (groupName, createdById, username) => {
    return new Promise((resolve, reject) => {
        let group = new groupModel({
            name: groupName,
            admins: [createdById],
            participants: [{ userId: createdById, username: username }],
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
                            reject('deleted group, cannot add admin')
                        }
                    })
                })
            }
        })
    })
}
const addUserToGroup = (groupId, userToAddId) => {
    return new Promise((resolve, reject) => {
        groupModel.findById(groupId, (err, group) => {
            if (err) {
                reject(err)
            } else {
                let resp = group?.participants.find((user) => user.userId.toString() === userToAddId)
                if (resp) {
                    reject('duplicate group')
                } else {
                    userModel.findById({ _id: userToAddId }, (err, user) => {
                        if (err) {
                            reject(err)
                        } else {
                            group.participants.push({ userId: user._id, username: user.username })
                            group.save((err) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    usersBL.addGroupToUser(groupId, userToAddId)
                                        .then(userResp => resolve({ group: group, username: userResp.username }))
                                        .catch(err => {
                                            reject(err)
                                        })
                                }
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
const removeUserFromGroup = (groupId, userId, userToRemoveId) => {
    return new Promise((resolve, reject) => {
        groupModel.findById(groupId, (err, group) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                if (userId == userToRemoveId || userId == group.admins[0]) {

                    let userIndex = group.participants.findIndex(user => user.userId.toString() === userToRemoveId)
                    if (userIndex != -1) {
                        group.participants.splice(userIndex, 1)
                        if (userId == group.admins[0] && userId == userToRemoveId) {
                            if (group.participants.length) {
                                group.admins[0] = group.participants[0].userId
                            } else {
                                group.admins[0] = undefined
                            }
                        }
                        group.save((err) => {
                            if (err) {
                                console.log(err, 'group.save()')
                                reject(err)
                            } else {
                                usersBL.removeGroupFromUser(groupId, userToRemoveId)
                                    .then(resp => resolve(resp))
                                    .catch(err => {
                                        console.log(err, 'catch userBL')
                                        reject(err)
                                    })
                            }
                        })
                    } else {
                        console.log('user not found')
                        reject('Desired user not found')
                    }
                } else {
                    reject('Not authorized')
                }
            }
        })
    })
}

module.exports = { createGroup, addMessageToGroup, addUserToGroup, removeUserFromGroup }
