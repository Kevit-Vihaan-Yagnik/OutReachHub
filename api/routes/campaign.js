const express = require('express');
const router = express.Router();
const auth = require('../auth');
const CampaignController = require('../controller/campaign');

router.post("/:workspaceId", auth , CampaignController.createCampaign);
router.get("/:workspaceId" , auth , CampaignController.getCampaigns);
router.delete('/:campaignId' , auth , CampaignController.deleteCampaign);
router.put("/:campaignId" , auth , CampaignController.editCampaign);
router.get("/contactsByTags/:campaignId" , auth , CampaignController.getContactsByCampaignTags);

module.exports = router;