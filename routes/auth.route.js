const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login-user', authController.loginUser);
router.post('/register-user', authController.registerUser);
router.get('/verify-user/:verificationCode', authController.verifyUser);

module.exports = router;
