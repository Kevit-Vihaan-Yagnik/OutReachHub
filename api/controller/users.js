const mongoose = require('mongoose');
const Users = require('../models/user');
const Workspace = require('../models/workspace');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.userSignup = async (req, res, next) => {
    console.log(req.body);
    try {
        const existingUser = await Users.findOne({ "contactInfo.email": req.body.contactInfo.email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            password: hash,
            contactInfo: {
                countryCode: req.body.contactInfo.countryCode,
                phoneNo: req.body.contactInfo.phoneNo,
                email: req.body.contactInfo.email,
            }
        });

        await user.save();

        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err
        });
    }
};



exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ "contactInfo.email": email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
};


exports.userDelete = (req, res, next) => {
    Users.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted successfuly"
            });
        })
        .catch(err => {
            console.log("Error While Deleting User : ", err);
            res.status(500).json({
                error: err
            })
        })
}