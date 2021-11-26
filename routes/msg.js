const express = require('express'); //import express
const multer = require('multer'); //import multer
const upload = multer();

const router = express.Router();

const msgController = require('../controllers/msg');

//Routes for all the desires calls and connected to their respective functions
router.post('/msg', upload.none(), msgController.newMsg);

router.get('/msg', msgController.getAllMsg);
router.delete('/msg', msgController.deleteAllMsg);

router.get('/msg/:id', msgController.getOneMsg);
router.post('/msg/:id', msgController.newMsg);
router.put('/msg/:id', msgController.updateMsg);
router.delete('/msg/:id', msgController.deleteOneMsg);

module.exports = router; //export to use in server.js