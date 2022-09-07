const userModel = require('./userModel')
const groupModel = require('./groupModel')
const signupUser = (username, password) => {
    let defaultGroups = ['6318c7ca821cf36aed9ac91a', '6318c804821cf36aed9ac92f', '6318c830821cf36aed9ac937']
    return new Promise((resolve, reject) => {
        let user = new userModel({ username: username, password: password })
        user.save((err, user) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                defaultGroups.forEach(groupId => {
                    console.log(groupId)
                    addGroupToUser(groupId, user._id)
                        .catch(err => reject(err))
                })
                resolve('User added')
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
const addGroupToUser = (groupId, userId ) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId, (err, user) => {
            if (err) {
                console.log('first error, usersBL')
                reject(err)
            } else {
                let resp = user.groups.find((group) => group._id.toString() == groupId)
                if (resp) {
                    console.log('duplicate group, usersBL')
                    reject('duplicate group')
                } else {
                    user.groups.push(groupId)
                    user.save((err) => {
                        if (err) {
                            console.log('after save, usersBL')
                            reject(err)
                        } else {
                            resolve('added group')
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
                    groupModel.find({ _id: { $in: user.groups } }).lean().exec((err, groups) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(groups)
                        }
                    })
                }
            })
        })
}
const removeGroup = (userId, groupId) => {

}

module.exports = { signupUser, loginUser, addGroupToUser, getGroupsOfUser }
