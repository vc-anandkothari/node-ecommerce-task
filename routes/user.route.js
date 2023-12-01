const router = require('express').Router();
const controller = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

router.get('/', controller.getUsers);
router.post('/create-user', userValidation, controller.createUser);
router.patch('/update-user', userValidation, controller.updateUser);
router.delete('/delete-user/:id', controller.deleteUser);

module.exports = router;
