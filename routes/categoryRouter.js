// import category
const categoryController = require('../controllers/categoryController');

const {authenticateToken} = require('../middlewares/auth');
const {validateId, validateCategoryInput, checkValidationResult} = require('../middlewares/validation')

const express = require('express');
const router = express.Router();


//GET-routes
router.get('/getAllPublished', categoryController.getAllPublishedCategories);
router.get('/:id', categoryController.getOneCategory);

//Get, post, delete put routes, requires Authentication
router.get('/protected/getAll', authenticateToken, categoryController.getAllCategories);
router.post('/protected/', [validateCategoryInput(), checkValidationResult], authenticateToken, categoryController.addCategory);
router.delete('/protected/:id', authenticateToken, [validateId(), checkValidationResult], categoryController.deleteCategory);
router.put('/protected/:id', authenticateToken, [validateId(), validateCategoryInput(), checkValidationResult], categoryController.updateCategory);

module.exports = router;