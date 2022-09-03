const userModel = require('./userModel')
const groupModel = require('./groupModel')
const signupUser = (username, password) => {
    return new Promise((resolve, reject) => {
        let user = new userModel({ username: username, password: password })
        user.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve('success')
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
const addGroupToUser = (userId, groupId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId, (err, user) => {
            if (err) {
                reject(err)
            } else {
                let resp = user.groups.find((id) => id.toString() == groupId)
                if (resp) {
                    reject('duplicate')
                } else {
                    user.groups.push(groupId)
                    user.save((err) => {
                        if (err) {
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
        //     userModel.findById(userId, (err, user) => {
        //         if (err) {
        //             reject(err)
        //         } else {
        //             groupModel.find({ _id: { $in: user.groups } }, (err, groups) => {
        //                 if (err) {
        //                     reject(err)
        //                 } else {
        //                     resolve(groups)
        //                 }
        //             })
        //         }
        //     })
        // })
        //populate user with group objects
        userModel.findOne({ id: userId })
            .populate("groups")
            .then(p => {
                resolve(p.groups)
            })
            .catch(error => console.log(error));
    })
}
const removeGroup = (userId, groupId) => {

}

module.exports = { signupUser, loginUser, addGroupToUser, getGroupsOfUser }
