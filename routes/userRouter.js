// import usercontroller
const userController = require('../controllers/userController');
const {validateUserFormInput, checkValidationResult} = require('../middlewares/validation')

const express = require('express');
const router = express.Router();


// user routes
router.post('/create',[validateUserFormInput(), checkValidationResult], userController.createUser);
router.post('/login', [validateUserFormInput(), checkValidationResult], userController.loginUser);


module.exports = router