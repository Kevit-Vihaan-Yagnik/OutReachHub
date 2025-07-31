const express = require('express');
const router = express.Router();
const auth = require('../auth');
const ContactController = require('../controller/contacts')

router.get('/userContact', auth , ContactController.userContact);

router.get('/filterByTags/:workspaceId' , auth , ContactController.filterByTags);

router.get('/:workspaceId', auth , ContactController.getContactsByWorkspace);

router.post('/:workspaceId', auth, ContactController.createContacts);

router.delete('/:contactId', auth, ContactController.deleteContact);

router.put('/:contactId', auth, ContactController.editContact);

module.exports = router;