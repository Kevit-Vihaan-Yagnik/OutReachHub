const mongoose = require('mongoose')

const workspaceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    name: { type: String, required: true },
    memCount: { type: Number, default: 1 },
    description : { type: String, default: "" },
    members: [
        {
            user_id: mongoose.Schema.Types.ObjectId,
            permissions: {
                write: { type: Boolean, default: false },
                allowAdd: { type: Boolean, default: false },
            },
            addDate: { type: Date, default: Date.now },
        },
    ],
    tags: { type: [String], default: [] },
    creationDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Workspace', workspaceSchema);