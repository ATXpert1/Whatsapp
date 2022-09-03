const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    groups: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "groups"
    },
    blockList: [mongoose.SchemaTypes.ObjectId]
})
module.exports = mongoose.model('users', userSchema)