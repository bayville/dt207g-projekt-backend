// import customercontroller
const customerController = require('../controllers/customerController');


const express = require('express');
const router = express.Router();


//GET-routes
router.post('/find', customerController.getOneCustomer);



module.exports = router;