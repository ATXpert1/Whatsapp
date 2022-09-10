const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxLength: 20,
        required: true
    },
    password: {
        type: String,
        maxLength: 25,
        required: true
    },
    groups: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "groups",
        unique: true,
        sparse: true,
        optional: true,
        index: true,
    },
    // groups: [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     unique: true,
    //     sparse: true
    // }],
    //     blockList: {
    //     type: [mongoose.SchemaTypes.ObjectId],
    //     ref: "groups",
    //     unique: true,
    //     sparse: true,
    // },
    blockList: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "groups",
        unique: true,
        optional: true,
        sparse: true,
        index: true,
    }],


})
module.exports = mongoose.model('users', userSchema)
