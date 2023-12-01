const router = require('express').Router();
const controller = require('../controllers/cart.controller');

router.get('/list', controller.getCart);
router.post('/add', controller.addProductToCart);
router.patch('/:id', controller.updateProductInCart);
router.delete('/:id', controller.deleteProductFromCart);

module.exports = router;
