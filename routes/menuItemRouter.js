// import category
const menuItemController = require('../controllers/menuItemController');


const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();


//GET-routes
router.get('/getAllPublished', menuItemController.getAllPublishedMenuItems);
router.get('/:id', menuItemController.getOneMenuItem);

//Get, post, delete, put routes, requires Authentication
router.get('/protected/getAll', authenticateToken, menuItemController.getAllMenuItems);
router.post('/protected/', authenticateToken, menuItemController.addMenuItem);
router.delete('/protected/:id', authenticateToken, menuItemController.deleteMenuItem);
router.put('/protected/:id', authenticateToken, menuItemController.updateMenuItem);


module.exports = router;