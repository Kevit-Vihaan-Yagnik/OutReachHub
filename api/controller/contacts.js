const mongoose = require("mongoose")

const Contacts = require('../models/contacts')
const Workspace = require('../models/workspace')
const Admin = require('../models/admin');
const workspace = require("../models/workspace");

exports.getContactsByWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const adminId = req.userData?.adminId;
        const userId = req.userData?.userId;


        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        if (!isAuthorized && userId) {
            const workspace = await Workspace.findOne({
                _id: workspaceId,
                "members.user_id": userId,
                "members.permissions.allowAdd": true,
            });

            if (!workspace) {
                return res.status(403).json({
                    message: "You do not have permission to access contacts to this workspace."
                });
            }

            isAuthorized = true;
        }

        if (!isAuthorized) {
            return res.status(403).json({
                message: "You are not authorized to access contacts."
            });
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
                "members.permissions.allowAdd": true,
            });

            if (!workspace) {
                return res.status(403).json({
                    message: "You do not have permission to add contacts to this workspace."
                });
            }

            isAuthorized = true;
        }

        if (!isAuthorized) {
            return res.status(403).json({
                message: "You are not authorized to add contacts."
            });
        }

        const workspace = await Workspace.findById(workspaceId)

        const { name, contactInfo, company, jobTitle, tags } = req.body;

        const validTags = tags.filter(t => workspace.tags.includes(t));

        if (tags?.length && validTags.length === 0) {
            return res.status(400).json({
                message: "None of the provided tags are valid for this workspace."
            });
        }

        const newContact = new Contacts({
            _id: new mongoose.Types.ObjectId(),
            workspaceId: workspaceId,
            creator: adminId || userId,
            name,
            contactInfo: {
                countryCode: contactInfo.countryCode,
                phoneNo: contactInfo.phoneNo,
                email: contactInfo.email,
            },
            company,
            jobTitle,
            tags: validTags,
        });

        await newContact.save();

        res.status(201).json({
            message: "Contact created successfully",
            contact: newContact
        });

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        const userId = req.userData.userId;
        const adminId = req.userData.adminId;

        let Authorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            Authorized = !!admin;
        }

        const allowed = await Contacts.findOne({
            _id: contactId,
            creator: userId
        })

        if (!Authorized && !allowed) {
            return res.status(403).json({ message: 'You are not authorized to manipulate these contact' })
        }

        await Contacts.deleteOne({
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
        const { contactId } = req.params;
        const userId = req.userData?.userId;
        const adminId = req.userData?.adminId;

        let isAuthorized = false;

        if (adminId) {
            const admin = await Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        const contact = await Contacts.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        if (!isAuthorized && contact.creator.toString() === userId) {
            isAuthorized = true;
        }

        if (!isAuthorized) {
            return res.status(403).json({ message: 'You are not authorized to edit this contact' });
        }

        const workspace = await Workspace.findById(contact.workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Associated workspace not found" });
        }

        const { name, phoneNo, countryCode, email, company, jobTitle, tags } = req.body;

        const workspaceTags = workspace.tags || [];
        const validTags = tags?.filter(t => workspaceTags.includes(t)) || [];

        await Contacts.updateOne(
            { _id: contactId },
            {
                name,
                contactInfo: {
                    countryCode,
                    phoneNo,
                    email,
                },
                company,
                jobTitle,
                tags: validTags,
            }
        );

        res.status(200).json({ message: "Contact updated successfully", updatedTags: validTags });

    } catch (error) {
        console.error('Error editing contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.userContact = async (req , res) => {
    try{
        const userId = req.userData?.userId;
        const myContacts = await Contacts.find({
            creator : userId
        })

        console.log(myContacts);

        res.status(200).json({
            count : myContacts.length,
            UserContacts : myContacts
        })

    }catch(err){
        res.status(500).json({
            message: "internal server error",
            error : err
        })
    }
}

exports.filterByTags = async(req , res) => {
    try{
        const {workspaceId} = req.params;
        const {tags} = req.body;
        const userId = req.userData?.userId;
        const adminId = req.userData?.adminId;

        let isAuthorized = false;

        if(adminId){
            const admin = Admin.findById(adminId);
            isAuthorized = !!admin;
        }

        if (!isAuthorized && userId) {
            let workspace = await Workspace.findOne({
                _id: workspaceId,
                "members.user_id": userId,
            });

            if (!workspace) {
                return res.status(403).json({
                    message: "You do not have permission to access contacts of this workspace."
                });
            }

            isAuthorized = true;
        }

        if (!isAuthorized) {
            return res.status(403).json({
                message: "You are not authorized to access contacts."
            });
        }

        const contactsFiltered = await Contacts.find({
            workspaceId: workspaceId,
            tags: { $in: tags }
        });

        res.status(200).json({
            count: contactsFiltered.length,
            filteredContacts: contactsFiltered
        });

    }catch(err){
        res.status(500).json({
            message : "internal server error",
            error : err
        })
    }
}