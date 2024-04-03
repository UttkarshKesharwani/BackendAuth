const express = require('express')
const router = require('./auth_router');
const {contactController,validateContactController} = require('../Controllers/contact_controller');
const routerContact = express.Router() 



routerContact.post('/contactUs',validateContactController,contactController)

module.exports = routerContact;
