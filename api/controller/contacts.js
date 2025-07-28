const mongoose = require("mongoose")

const Contacts = require('../models/contacts')
const Workspace = require('../models/workspace')

exports.getContactsByWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;

        if (!workspaceId) {
            return res.status(400).json({ message: 'Workspace ID is required' });
        }

        const contacts = await Contacts.find({ workspaceId })
            .populate('creator', 'name')
            .populate('tags', 'name')
            .sort({ name: 1 });
        res.status(200).json({ contacts });
    } catch (error) {
        console.error('Error fetching contacts by workspace:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createContacts = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const userId = req.user._id;

        const workspace = await Workspace.findOne({
            _id: workspaceId,
            "members.user_id": userId,
            "members.permissions.allowAdd": true,
        });

        if (!workspace) {
            return res.status(403).json({ message: "You do not have permission to add contacts to this workspace." });
        }

        const { name, phoneNo, countryCode, email, company, jobTitle, tags } = req.body;

        const newContact = new Contacts({
            _id: new mongoose.Types.ObjectId(),
            workspaceId,
            creator: userId,
            name,
            contactInfo: {
                countryCode,
                phoneNo,
                email,
            },
            company,
            jobTitle,
            tags,
        });

        await newContact.save();

        res.status(201).json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        await isAllowed(req, res);

        Contacts.deleteOne({
            _id: contactId
        })
        res.status(201).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.log('Error deleting contact', error);
        res.status(500).json({ message: 'internal server error' })
    }
}

exports.editContact = async (req, res) => {
    try {

        const { contactId } = req.params
        await isAllowed(req, res);

        const { name, phoneNo, countryCode, email, company, jobTitle, tags } = req.body;

        Contacts.updateOne({
            _id: contactId,
            creator: req.user._id
        }, {
            name,
            contactInfo: {
                countryCode,
                phoneNo,
                email,
            },
            company,
            jobTitle,
            tags,
        })
    } catch (error) {
        console.log('Error editing contact', error);
        res.status(500).json({ message: 'internal server error' })
    }
}

const isAllowed = async (req, res) => {
    try {
        const { contactId } = req.params;
        const userId = req.user._id;

        const allowed = Contacts.findOne({
            _id: contactId,
            creator: userId
        })

        if (!allowed) {
            return res.status(403).json({ message: 'You are not authorized to manipulate these contact' })
        }
    } catch (error) {
        console.log('Error on Allowed', error);
        return res.status(500).json({ message: 'Internal server error' })
    }

}