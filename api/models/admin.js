const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    password: { type: String, required: true },
    contactInfo: {
        countryCode: { type: String },
        phoneNo: { type: Number, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        },
    },
    joinDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Admin' ,adminSchema);