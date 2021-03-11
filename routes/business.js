const express = require('express');
const router = express.Router();
const ctrl=require('../controllers');

router.get('/:clientIndex/show/:businessIndex',ctrl.business.renderBusiness);
router.get('/:clientIndex/new',ctrl.business.renderNew);
router.post('/:clientIndex/new',ctrl.business.createBusiness);

module.exports = router;