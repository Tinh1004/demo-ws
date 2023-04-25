const mongoose = require('mongoose')


const saveLoginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId, ref: 'user',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('saveLogin', saveLoginSchema)