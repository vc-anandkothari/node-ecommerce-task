const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/json-web-token-validator');

router.use('/auth', require('./auth.route'));
router.use('/users', authJWT.authenticateToken, require('./user.route'));
router.use('/products', authJWT.authenticateToken, require('./product.route'));
router.use('/cart', authJWT.authenticateToken, require('./cart.route'));

module.exports = router;
