const express = require('express');
const router = express.Router();
const ctrl=require('../controllers');

router.get('/login',ctrl.clients.renderLogin);

router.get('/signup',ctrl.clients.renderSignup);

module.exports = router;