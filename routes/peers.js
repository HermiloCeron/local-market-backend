const express = require('express');
const router = express.Router();
const ctrl=require('../controllers');

router.get('/update',ctrl.peers.updatePeers);

module.exports = router;