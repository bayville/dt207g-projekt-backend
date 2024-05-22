// import category
const openHoursController = require('../controllers/openHoursController');

const {authenticateToken} = require('../middlewares/auth');


const express = require('express');
// const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();


//GET-routes
router.get('/getAll', openHoursController.getAllDays);
router.get('/:id', openHoursController.getOneDay);

//Get, post, delete put routes, requires Authentication
router.put('/protected/:id', authenticateToken, openHoursController.updateDay);
router.post('/protected/', authenticateToken, openHoursController.addDay);


module.exports = router;