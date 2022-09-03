const mongoose = require('mongoose')
let messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.SchemaTypes.ObjectId,
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
})
let locationModel = mongoose.model('message', messageSchema)
module.exports = {
    messageSchema,
    locationModel,
};
