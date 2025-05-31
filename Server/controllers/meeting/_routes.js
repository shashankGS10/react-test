const express = require('express');
const router = express.Router();
const meetingController = require('./meeting');

router.get('/meeting', meetingController.index);
router.post('/meeting/add', meetingController.add);
router.get('/meeting/view/:id', meetingController.view);
router.delete('/meeting/delete/:id', meetingController.deleteData);
router.post('/meeting/deleteMany', meetingController.deleteMany);

module.exports = router;
