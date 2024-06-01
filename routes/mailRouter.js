// import mailcontroller
const mailController = require('../controllers/mailController');


const express = require('express');
const router = express.Router();


router.post('/contactForm', mailController.sendContactFormMail);



module.exports = router;