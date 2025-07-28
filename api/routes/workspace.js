const express = require('express');
const router = express.Router();
const auth = require('../auth');
const WorkspaceController = require('../controller/workspace');

router.post('/create', auth , WorkspaceController.createWorkspace)
router.get('/', auth , WorkspaceController.getWorkspace)
router.get('/:workspaceId' , auth, WorkspaceController.getWorkspaceById)
router.put('/:workspaceId' , auth , WorkspaceController.editWorkspace)
router.delete('/:workspaceId' , auth , WorkspaceController.deleteWorkspace)
router.post('/addMembers/:workspaceId' , auth , WorkspaceController.addMembers);
router.delete('/removeMembers/:workspaceId' , auth , WorkspaceController.removeMembers)
router.post('/addTags/:workspaceId' , auth , WorkspaceController.addTags)
router.delete('/removeTags/:workspaceId' , auth , WorkspaceController.deleteTags)

module.exports = router;

