const express = require('express');
const router = express.Router();
const ctrl=require('../controllers');

router.get('/login',ctrl.clients.renderLogin);
router.get('/signup',ctrl.clients.renderSignup);
router.get('/profile/:index',ctrl.clients.renderProfile);
router.get('/edit/:index',ctrl.clients.renderEdit);
router.get('/changeRequests/:index',ctrl.clients.renderChangeRequests);
router.get('/ownerAprovals/:index',ctrl.clients.renderOwnerAprovals);
router.post('/login',ctrl.clients.loginClient);
router.post('/signup',ctrl.clients.signupClient);
router.put('/edit/:index',ctrl.clients.editClient);
router.delete('/delete/:index',ctrl.clients.deleteClient);

module.exports = router;