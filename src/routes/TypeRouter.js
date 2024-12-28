const express = require("express");
const router = express.Router()
const TypeController = require('../controllers/TypeController');

router.get('/', TypeController.getAllTypes)
router.post('/', TypeController.createManyTypes)
// router.get('/get-details/:id', TypeController.getDetailsType)

module.exports = router