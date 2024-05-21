// import category
const categoryController = require('../controllers/categoryController');

const {authenticateToken} = require('../middlewares/auth');


const express = require('express');
// const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();


//GET-routes
router.get('/getAllPublished', categoryController.getAllPublishedCategories);
router.get('/:id', categoryController.getOneCategory);

//Get, post, delete put routes, requires Authentication
router.get('/protected/getAll', authenticateToken, categoryController.getAllCategories);
router.post('/protected/', authenticateToken, categoryController.addCategory);
router.delete('/protected/:id', authenticateToken, categoryController.deleteCategory);
router.put('/protected/:id', authenticateToken, categoryController.updateCategory);


module.exports = router;