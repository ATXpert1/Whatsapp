
const mongoose = require('mongoose')

let groupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 5,
        maxLength: 20,
    },
    // admins: [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "users",
    //     unique: true,
    //     optional: true,
    //     sparse: true,
    //     index: true,
    // }],
    admins: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "users",
        sparse: true,
        optional: true,
        index: true,
    },
    participants: [{
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
            required: true,
            sparse: true,
            optional: true,
            index: true,
        },
        username: {
            type: String,
            required: true
        }
    }],
    // participants: {
    //     type: [mongoose.SchemaTypes.ObjectId],
    //     unique: true,
    //     ref: 'users',
    //     required: true
    // },
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
            default: Date.now,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
})
module.exports = mongoose.model('groups', groupSchema)
