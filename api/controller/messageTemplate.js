const mongoose = require("mongoose")

const MessageTemplate = require('../models/messageTemplate');
const Workspace = require("../models/workspace");
const Admin = require('../models/admin');
const workspace = require("../models/workspace");


exports.addTemplate = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.userData?.userId;
        const adminId = req.userData?.adminId;

        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        if (!isAuthorized && userId) {
            const workspace = Workspace.find({
                _id: workspaceId,
                "members.user_id": userId,
                "members.permissions.write": true,
            })

            if (!workspace) {
                res.status(403).json({
                    message: "You are unauthorized to access message template"
                })
            }
        }

        if (!isAuthorized) {
            res.status(403).json({
                message: "You are unauthorized to access message template"
            })
        }

        const {type , title , templateImage , template} = req.body;

        await MessageTemplate.insertOne({
            workspaceId,
            _id : new mongoose.Types.ObjectId(),
            type,
            title,
            templateImage,
            template
        })

        res.status(201).json({
            message : "Message template inserted successfuly",
        })

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
}

exports.getTemplates = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.userData?.userId;
        const adminId = req.userData?.adminId;

        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        if (!isAuthorized && userId) {
            const workspace = Workspace.find({
                _id: workspaceId,
                "members.user_id": userId,
            })

            if (!workspace) {
                res.status(403).json({
                    message: "You are unauthorized to access message template"
                })
            }
        }

        if (!isAuthorized) {
            res.status(403).json({
                message: "You are unauthorized to access message template"
            })
        }

        const templates = await MessageTemplate.find({
            workspaceId : workspaceId
        })

        res.status(200).json({
            count : templates.length,
            MessageTemplates : templates
        })

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
}

exports.deleteTemplate = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.userData?.userId;
        const adminId = req.userData?.adminId;

        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        if (!isAuthorized && userId) {
            const workspace = Workspace.find({
                _id: workspaceId,
                "members.user_id": userId,
                "members.permissions.write": true,
            })

            if (!workspace) {
                res.status(403).json({
                    message: "You are unauthorized to access message template"
                })
            }
        }

        if (!isAuthorized) {
            res.status(403).json({
                message: "You are unauthorized to access message template"
            })
        }

        const {msgId} = req.body;
        
        await MessageTemplate.deleteOne({
            _id : msgId
        })

        res.status(201).json({
            message : "Message template deleted successfuly",
        })

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
}

exports.editTemplate = async (req, res) => {
    try {
        const { workspaceId, templateId } = req.params;
        const userId = req.userData?.userId;
        const adminId = req.userData?.adminId;

        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        if (!isAuthorized && userId) {
            const workspace = await Workspace.findOne({
                _id: workspaceId,
                "members.user_id": userId,
                "members.permissions.write": true,
            });

            if (!workspace) {
                return res.status(403).json({
                    message: "You are unauthorized to edit this message template."
                });
            }

            isAuthorized = true;
        }

        if (!isAuthorized) {
            return res.status(403).json({
                message: "You are unauthorized to edit this message template."
            });
        }

        const { type, title, templateImage, template } = req.body;

        const updated = await MessageTemplate.updateOne(
            { _id: templateId, workspaceId },
            {
                $set: {
                    type,
                    title,
                    templateImage,
                    template
                }
            }
        );

        if (updated.matchedCount === 0) {
            return res.status(404).json({ message: "Message template not found" });
        }

        res.status(200).json({
            message: "Message template updated successfully"
        });

    } catch (err) {
        console.error("Error editing template:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
};
