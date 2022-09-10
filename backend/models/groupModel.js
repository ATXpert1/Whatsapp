
const mongoose = require('mongoose')

let groupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    // admins: [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "users",
    //     unique: true,
    //     required: true
    // }],
    admins: {
        type: [mongoose.SchemaTypes.ObjectId],
        unique: true,
        ref: 'users',
        required: true
    },
    // participants: [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "users",
    //     unique: true,
    //     required: true
    // }],
    // participants: {
    //     type: [{
    //         userId: mongoose.SchemaTypes.ObjectId,
    //         userName: String
    //     }],
    //     unique: true,
    //     ref: 'users',
    //     required: true
    // },
    participants: {
        type: [mongoose.SchemaTypes.ObjectId],
        unique: true,
        ref: 'users',
        required: true
    },
    messages: [{
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'users',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        timeStamp: {
            type: Date,
            default: new Date(),
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
})
module.exports = mongoose.model('groups', groupSchema)
