// import category
const customerController = require('../controllers/customerController');

const {authenticateToken} = require('../middlewares/auth');


const express = require('express');
// const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();


//GET-routes
router.post('/find', customerController.getOneCustomer);



module.exports = router;