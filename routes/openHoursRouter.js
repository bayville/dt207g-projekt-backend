// import openhours controller
const openHoursController = require('../controllers/openHoursController');
const {authenticateToken} = require('../middlewares/auth');
const {validateId, validateDayFormInput, checkValidationResult} = require('../middlewares/validation')

const express = require('express');
const router = express.Router();


//GET-routes
router.get('/getAll', openHoursController.getAllDays);
router.get('/:id', openHoursController.getOneDay);

//Get, post, delete put routes, requires Authentication
router.put('/protected/:id', authenticateToken, [validateId(), validateDayFormInput(), checkValidationResult], openHoursController.updateDay);
router.post('/protected/', authenticateToken, [validateDayFormInput(), checkValidationResult], openHoursController.addDay);


module.exports = router;