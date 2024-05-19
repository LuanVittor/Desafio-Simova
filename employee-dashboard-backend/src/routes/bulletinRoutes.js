const express = require('express');
const router = express.Router();
const { getBulletins, getBulletinsByEmployeeId } = require('../controllers/bulletinController');

router.get('/', getBulletins);
router.get('/employee/:employeeId', getBulletinsByEmployeeId);

module.exports = router;
