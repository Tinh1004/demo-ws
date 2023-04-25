const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId, ref: 'user',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('feedback', feedbackSchema)