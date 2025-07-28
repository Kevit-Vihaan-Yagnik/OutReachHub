const mongoose = require('mongoose');
const Workspace = require('../models/workspace');
const Admin = require('../models/admin');
const admin = require('../models/admin');
const Users = require('../models/user')

exports.getWorkspace = async (req, res) => {
    try {
        const workspaces = await Workspace.find()
            .select('_id creator name memCount description tags creationDate')
            .populate('creator', 'name email');

        res.status(200).json({
            count: workspaces.length,
            workspaces: workspaces,
        });
    } catch (error) {
        console.error('Error happened while getting Workspaces', error);
        res.status(500).json({ message: 'internal server error' });
    }
}

exports.getWorkspaceById = async (req, res) => {
    const { workspaceId } = req.params;

    try {
        const workspace = await Workspace.findById(workspaceId)
            .populate('creator', 'name email')
            .populate('members.user_id', 'name contactInfo.email');

        if (!workspace) {
            return res.status(404).json({ message: 'No workspace found for the provided ID' });
        }

        res.status(200).json(workspace);
    } catch (error) {
        console.error("Error while finding Workspace by ID: ", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid workspace ID format' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.createWorkspace = async (req, res) => {
    try {
        const adminId = req.userData.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Forbidden: Only admins can create workspaces." });
        }

        const { name, description, members, tags } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Workspace name is required." });
        }

        const newWorkspace = new Workspace({
            _id: new mongoose.Types.ObjectId(),
            creator: adminId,
            name: name,
            description: description || "",
            members: members ? members.map(mem => ({
                user_id: mem.user_id,
                permissions: mem.permissions || { write: false, allowAdd: false }
            })) : [],
            tags: tags || []
        });

        newWorkspace.memCount = newWorkspace.members.length;

        const savedWorkspace = await newWorkspace.save();

        res.status(201).json({
            message: "Workspace created successfully",
            workspace: savedWorkspace
        });
    } catch (error) {
        console.error("Error creating workspace:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.editWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const adminId = req.userData.adminId;
        const admin = Admin.findById(adminId);

        if (!admin) {
            res.status(403).json({
                message: "Auth failed"
            });
        }

        const { name, description } = req.body

        Workspace.updateOne({
            _id: workspaceId
        }, {
            name,
            description
        }).then(res.status(200).json({
            message: "Workspace edited successfuly"
        }))

    } catch (err) {
        res.status(500).json({
            message: `internal server error`
        })
    }
}

exports.addMembers = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { members } = req.body;

        const adminId = req.userData.adminId;
        const userId = req.userData.userId;

        // Fetch workspace
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        // Check if request is authorized
        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        } else if (userId) {
            const member = workspace.members.find(m => m.user_id.toString() === userId);
            isAuthorized = member && member.permissions.allowAdd;
        }

        if (!isAuthorized) {
            return res.status(403).json({ message: "Not authorized to add members" });
        }

        // Filter out users that are already in the workspace
        const existingUserIds = workspace.members.map(m => m.user_id.toString());
        const newMembers = members.filter(mem => !existingUserIds.includes(mem.user_id));

        if (newMembers.length === 0) {
            return res.status(200).json({ message: "All members already exist in workspace" });
        }

        // Add new members to workspace and update users
        for (const mem of newMembers) {
            workspace.members.push({
                user_id: mem.user_id,
                permissions: mem.permissions || { write: false, allowAdd: false },
                addDate: new Date()
            });

            // Add workspace to the user's workspaces array if not already present
            await Users.updateOne(
                { _id: mem.user_id, workspaces: { $ne: workspaceId } },
                { $push: { workspaces: workspaceId } }
            );
        }

        // Update member count
        workspace.memCount = workspace.members.length;
        await workspace.save();

        return res.status(200).json({
            message: "Members added successfully",
            addedMembers: newMembers.map(mem => mem.user_id)
        });

    } catch (err) {
        console.error("Add members error:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const adminId = req.userData.adminId;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({
                message: "Auth failed"
            });
        }

        const deleted = await Workspace.deleteOne({ _id: workspaceId });

        await Users.updateMany(
            { workspaces: workspaceId },
            { $pull: { workspaces: workspaceId } }
        );

        return res.status(200).json({
            message: "Workspace deleted successfully"
        });
    } catch (err) {
        console.error("Delete workspace error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};



exports.removeMembers = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { memberIds } = req.body;

        const adminId = req.userData.adminId;
        const userId = req.userData.userId;

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        } else if (userId) {
            const member = workspace.members.find(m => m.user_id.toString() === userId);
            isAuthorized = member && member.permissions.allowAdd;
        }

        if (!isAuthorized) {
            return res.status(403).json({ message: "Not authorized to remove members" });
        }

        const existingUserIds = workspace.members.map(m => m.user_id.toString());
        const validRemovals = memberIds.filter(id => existingUserIds.includes(id));

        if (validRemovals.length === 0) {
            return res.status(400).json({ message: "No valid members found to remove" });
        }

        workspace.members = workspace.members.filter(m => !validRemovals.includes(m.user_id.toString()));
        workspace.memCount = workspace.members.length;
        await workspace.save();

        await Users.updateMany(
            { _id: { $in: validRemovals } },
            { $pull: { workspaces: workspaceId } }
        );

        return res.status(200).json({
            message: "Members removed successfully",
            removedMembers: validRemovals
        });

    } catch (err) {
        console.error("Remove members error:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addTags = async (req, res) => {
    try {
        const { workspaceId } = req.params;

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        const adminId = req.userData.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const { tags } = req.body;
        if (!Array.isArray(tags)) {
            return res.status(400).json({ message: "Tags must be an array." });
        }

        const existingTags = workspace.tags || [];
        const newTags = tags.filter(t => !existingTags.includes(t));

        if (newTags.length === 0) {
            return res.status(400).json({
                message: "The tags that were mentioned already exist"
            });
        }

        workspace.tags.push(...newTags);
        await workspace.save();

        res.status(200).json({
            message: "Tags added successfully",
            addedTags: newTags
        });

    } catch (err) {
        console.error("Add tags error:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.deleteTags = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { tags } = req.body;

        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: "Tags must be a non-empty array" });
        }

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        const existingTags = workspace.tags || [];
        const canBeRemoved = tags.filter(t => existingTags.includes(t));

        if (canBeRemoved.length === 0) {
            return res.status(400).json({
                message: "None of the provided tags exist in the workspace"
            });
        }

        workspace.tags = existingTags.filter(tag => !canBeRemoved.includes(tag));

        await workspace.save();

        return res.status(200).json({
            message: "Tags deleted successfully",
            deletedTags: canBeRemoved
        });

    } catch (err) {
        console.error("Delete tags error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};


