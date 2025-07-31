const mongoose = require('mongoose');

const Workspace = require('../models/workspace');
const User = require('../models/user');
const Admin = require("../models/admin");
const Campaign = require("../models/campaign");
const Contact = require('../models/contacts');

exports.createCampaign = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.userData?.userId;

        if (!userId) {
            return res.status(403).json({ message: "Auth failed" });
        }

        const isAllowed = await Workspace.findOne({
            _id: workspaceId,
            "members.user_id": userId,
            "members.permissions.write": true
        });

        if (!isAllowed) {
            return res.status(403).json({ message: "Auth failed" });
        }

        const { name, tags, startDate, endDate, messageTemplate } = req.body;

        const newCampaign = await Campaign.create({
            _id: new mongoose.Types.ObjectId(),
            workspaceId,
            creator: userId,
            name,
            tags,
            startDate,
            endDate,
            messageTemplate,
        });

        res.status(201).json({
            message: "Campaign created successfully",
            newCampaign,
        });

    } catch (err) {
        console.error("Create Campaign Error:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.userData?.userId;

        if (!userId) {
            return res.status(403).json({ message: "Auth failed" });
        }

        const isAllowed = await Workspace.findOne({
            _id: workspaceId,
            "members.user_id": userId,
        });

        if (!isAllowed) {
            return res.status(403).json({ message: "Auth failed" });
        }

        const campaigns = await Campaign.find({
            workspaceId: workspaceId
        });

        res.status(200).json({
            count: campaigns.length,
            campaigns: campaigns
        });

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
}

exports.deleteCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const userId = req.userData?.userId;

        if (!userId) {
            return res.status(403).json({ message: "Auth failed" });
        }

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        if (campaign.creator.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this campaign" });
        }

        await Campaign.deleteOne({
            _id: campaignId
        })

        res.status(200).json({
            message: "record deleted successfuly"
        })

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
}

exports.editCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const userId = req.userData?.userId;

        if (!userId) {
            return res.status(403).json({ message: "Auth failed" });
        }

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        if (campaign.creator.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this campaign" });
        }

        if (campaign.status !== 'Draft') {
            return res.status(400).json({ message: "Only draft campaigns can be edited" });
        }

        const { name, tags, startDate, endDate, messageTemplate  } = req.body;

        await Campaign.updateOne(
            { _id: campaignId },
            {
                $set: {
                    name,
                    tags,
                    startDate,
                    endDate,
                    messageTemplate,
                }
            }
        );
        return res.status(200).json({
            message: "Campaign updated successfully"
        });

    } catch (err) {
        console.error("Edit Campaign Error:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};


exports.getContactsByCampaignTags = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const userId = req.userData?.userId;

        if (!userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        const workspaceId = campaign.workspaceId;
        const campaignTags = campaign.tags;

        const workspace = await Workspace.findOne({
            _id: workspaceId,
            "members.user_id": userId
        });

        if (!workspace) {
            return res.status(403).json({
                message: "You do not have access to this workspace"
            });
        }

        const contacts = await Contact.find({
            workspaceId: workspaceId,
            tags: { $in: campaignTags }
        });

        return res.status(200).json({
            message: "Contacts fetched successfully",
            contacts
        });

    } catch (err) {
        console.error("Error fetching contacts by campaign tags:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};
