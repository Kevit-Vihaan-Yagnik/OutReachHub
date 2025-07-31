const mongoose = require('mongoose')

const messageTemplateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    type: { type: String, enum: ["text", "text-image"], default: "text" },
    title: { type: String, required: true },
    templateImage: {
        type: String,
    },
    template: { type: String, required: true },
})

module.exports = mongoose.model('MessageTemplate' , messageTemplateSchema);
