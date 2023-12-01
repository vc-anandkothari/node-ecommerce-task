const router = require('express').Router();
const controller = require('../controllers/product.controller');
const productValidate = require('../validations/product.validation');

router.get('/', controller.getProducts);
router.post('/create-product', productValidate, controller.createProduct);
router.patch('/update-product', productValidate, controller.updateProduct);
router.delete('/delete-product/:id', controller.deleteProduct);

module.exports = router;
