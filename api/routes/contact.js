const express = require('express');
const router = express.Router();
const auth = require('../auth');
const ContactController = require('../controller/contacts')

router.get('/workspace/:workspaceId', ContactController.getContactsByWorkspace);

router.post('/workspace/:workspaceId', auth, ContactController.createContacts);

router.delete('/:contactId', auth, ContactController.deleteContact);

router.put('/:contactId', auth, ContactController.editContact);

module.exports = router;