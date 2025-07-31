const express = require('express');
const router = express.Router();

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({debug:true});
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin')
const workspaceRoutes =require('./routes/workspace')
const contactRoutes = require('./routes/contact')
const messageTemplateRoutes = require('./routes/messageTemplate')
const campaignRoutes = require("./routes/campaign")
mongoose.connect(process.env.mango_URL)
    
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods" , 'PUT , POST , PATCH , DELETE , GET');
        return res.status(200).json({});
    }
    next()  
})

app.use("/user" , userRoutes);
app.use("/admin" , adminRoutes);
app.use("/workspace" , workspaceRoutes);
app.use("/contacts", contactRoutes);
app.use("/messageTemplate" , messageTemplateRoutes);
app.use("/campaign" , campaignRoutes);


module.exports = app;

