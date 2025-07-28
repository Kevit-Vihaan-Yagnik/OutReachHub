const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// Signup Route
exports.adminSignup = async (req, res) => {
    try {
        const { name, password, contactInfo } = req.body;

        const existingAdmin = await Admin.findOne({ "contactInfo.email" : contactInfo.email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            _id : new mongoose.Types.ObjectId(),
            name : name,
            password: hashedPassword,
            contactInfo : {
                countryCode : contactInfo.countryCode,
                phoneNo : contactInfo.phoneNo,
                email : contactInfo.email
            }
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};

// Login Route
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ "contactInfo.email" : email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
