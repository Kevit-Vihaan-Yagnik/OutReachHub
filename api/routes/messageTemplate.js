const express = require('express')
const router = express.Router();
const auth = require('../auth');

const MessageTemplateController  = require('../controller/messageTemplate');

router.get('/:workspaceId' , auth , MessageTemplateController.getTemplates);
router.post('/:workspaceId', auth , MessageTemplateController.addTemplate);
router.delete('/:workspaceId' , auth , MessageTemplateController.deleteTemplate);
router.put('/:workspaceId/:templateId' , auth , MessageTemplateController.editTemplate);

module.exports = router;