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
        group.id = group._id;
        delete group._id;
        group.save((err, group) => {
            if (err) {
                reject(err)
            } else {
                usersBL.addGroupToUser(createdById, group._id).then(resp => {
                    resolve('group created')
                }).catch(err => {
                    groupModel.findByIdAndDelete(group._id, (err, group) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve('deleted group')
                        }
                    })
                })
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
        groupModel.findByIdAndUpdate(groupId, { $push: { messages: messageObj } }, {new: true})
        .then(resp => resolve(resp.messages.at(-1)))
        .catch(err => reject(err))
    })
}

module.exports = { createGroup, addMessageToGroup }
