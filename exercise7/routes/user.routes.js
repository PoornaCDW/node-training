const expressApp = require('express');
const router = expressApp.Router();

const userController = require('../controllers/userController');

router.post('/signUp', userController.signUp);

router.post('/login', userController.login);

module.exports = router;