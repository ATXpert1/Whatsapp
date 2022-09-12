const userModel = require('./userModel')
const groupModel = require('./groupModel')
const groupsBL = require('./groupsBL')
const signupUser = (username, password) => {
    return new Promise((resolve, reject) => {
        let user = new userModel({ username: username, password: password })
        user.save((err, user) => {
            if (err) {
                console.log(err)
                reject(err)
            } else{
                resolve(user)
            }
        })
    })
}
const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ username: username }, (err, user) => {
            if (err) {
                reject(err)
            } else {
                if (!user) {
                    reject('wrong credentials')
                } else {
                    if (user.password == password) {
                        resolve(user._id.toString())
                    } else {
                        reject('wrong credentials')
                    }
                }
            }
        })
    })
}
// remove all single groups of user, and give admin to other person if two or more present in group
const deleteUser = (userId) => {

}
const addGroupToUser = (groupId, userId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId, (err, user) => {
            if (err) {
                reject(err)
            } else {
                let resp = user.groups.find((group) => group._id.toString() == groupId)
                if (resp) {
                    reject('duplicate group')
                } else {
                    user.groups.push(groupId)
                    user.save((err) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(user)
                        }
                    })
                }
            }
        })
    })
}
const getGroupsOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId, (err, user) => {
            if (err) {
                reject(err)
            } else {
                if (user) {
                    groupModel.find({ _id: { $in: user?.groups } }).lean().exec((err, groups) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(groups)
                        }
                    })
                } else {
                    reject('user not found')
                }
            }
        })
    })
}
const removeGroupFromUser = (groupId, userId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId, (err, user) => {
            if (err) {
                reject(err)
            } else {
                let groupIndex = user.groups.findIndex(group => group._id.toString() === groupId)
                if (groupIndex != -1) {
                    user.groups.splice(groupIndex, 1)
                    user.save((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve('removed group from user')
                        }
                    })
                } else {
                    reject('cannot find group in the user groups')
                }
            }
        })
    })
}

module.exports = { signupUser, loginUser, addGroupToUser, getGroupsOfUser, removeGroupFromUser }
