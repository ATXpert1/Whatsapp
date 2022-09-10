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
                reject(err)
            } else {
                let resp = group?.participants.find((user) => user._id.toString() == userId)
                if (resp) {
                    reject('duplicate group')
                } else {
                    group.participants.push(userId)
                    group.save((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            usersBL.addGroupToUser(groupId, userId)
                                .then(userResp => resolve(group))
                                .catch(err => {
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
const removeUserFromGroup = (groupId, userId, userToRemoveId) => {
    return new Promise((resolve, reject) => {
        groupModel.findById(groupId, (err, group) => {
            if (err) {
                reject(err)
            } else {
                if (userId == userToRemoveId || userId == group.admins[0]) {
                    let userIndex = group.participants.findIndex(user => user._id == userToRemoveId)
                    if (userIndex != -1) {
                        group.participants.splice(userIndex, 1)
                        if (userId == group.admins[0] && userId == userToRemoveId) {
                            if (group.participants.length) {
                                group.admins[0] = group.participants[0]
                            } else {
                                group.admins[0] = undefined
                            }
                        }
                        group.save((err) => {
                            if (err) {
                                reject(err)
                            } else {
                                usersBL.removeGroupFromUser(groupId, userToRemoveId)
                                    .then(resp => resolve(resp))
                                    .catch(err => {
                                        reject(err)
                                    })
                            }
                        })
                    }
                    reject('desired user not found')
                }
                reject('group not found')
            }
        })
    })
}

module.exports = { createGroup, addMessageToGroup, addUserToGroup, removeUserFromGroup }
