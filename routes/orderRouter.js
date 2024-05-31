// import category
const orderController = require('../controllers/orderController');
const statusController = require('../controllers/statusController');


const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();


// //GET-routes
// router.get('/getAllPublished', menuController.getAllPublishedMenus);
router.get('/id=:id', orderController.getOneOrder);
router.get('/statuses/', statusController.getAllStatuses);
router.get('/getOrderStatus/:id', orderController.getOrderStatus);

//Get, post, delete, put routes, requires Authentication
router.get('/protected/getAll', authenticateToken, orderController.getAllOrders);
router.post('/',  orderController.newOrder);
router.delete('/protected/:id', authenticateToken, orderController.deleteOrder);
router.put('/protected/:id', authenticateToken, orderController.updateOrder);
router.put('/protected/status/:id', authenticateToken, orderController.updateOrderStatus);


module.exports = router;