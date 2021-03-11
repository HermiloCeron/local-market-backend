const express = require('express');
const router = express.Router();
const ctrl=require('../controllers');

router.get('/:clientIndex/show/:businessIndex',ctrl.business.renderBusiness);
router.get('/:clientIndex/new',ctrl.business.renderNew);
router.get('/:clientIndex/edit/:businessIndex',ctrl.business.renderEdit);
router.post('/:clientIndex/new',ctrl.business.createBusiness);
router.put('/:clientIndex/edit/:businessIndex',ctrl.business.editBusiness);
router.put('/:clientIndex/changeAction/:changeIndex',ctrl.business.changeAction);
router.delete('/:clientIndex/delete/:businessIndex',ctrl.business.deleteBusiness);

module.exports = router;