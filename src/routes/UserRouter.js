const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authUserMiddleWare } = require("../middlewares/authMiddleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.get('/', userController.getCurrentUser)
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser)


module.exports = router