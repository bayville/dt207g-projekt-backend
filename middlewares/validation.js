const { body,param, validationResult } = require('express-validator');
// Validate username and password
function validateUserFormInput() {
    return [
        body('username').trim().notEmpty().escape().withMessage("Användarnamn måste fyllas i").isLength({min:3}).withMessage("Användarnamnet måste vara minst 3 tecken långt"),
        body('password').trim().notEmpty().withMessage("Lösenord måste fyllas i")
            .isLength({ min: 8 }).withMessage("Lösenordet måste vara minst 8 tecken långt")
            .custom((value, { req }) => {
                // Check if password is the same as username
                if (value === req.body.username) {
                    throw new Error("Lösenordet får inte vara samma som användarnamnet");
                }
                return true;
            })
    ];
}

//Validate id param
function validateId(){
    return[ param('id').notEmpty().isInt().withMessage("Id måste vara ett heltal") ]
}

function validateWorkForm() {
    return [
        // Validate starttime
        body('startTime')
            .notEmpty().withMessage('Starttid får inte vara tom')
            .isISO8601().withMessage('Starttid måste vara i ett giltigt datumformat')
            .custom((value, { req }) => {
                // Check if starttime is in the future
                if (new Date(value) > new Date()) {
                    throw new Error('Starttiden kan inte ligga i framtiden');
                }
                return true;
            }),

        // Validate enddtime
        body('endTime')
            .notEmpty().withMessage('Sluttid får inte vara tom')
            .isISO8601().withMessage('Sluttid måste vara i ett giltigt datumformat')
            .custom((value, { req }) => {
                // Check if endtime is before starttime
                if (new Date(value) < new Date(req.body.startTime)) {
                    throw new Error('Sluttiden kan inte vara före starttiden');
                }

                // Check if endttime is in the future
                if (new Date(value) > new Date()) {
                    throw new Error('Sluttiden kan inte ligga i framtiden');
                }

                return true;
            })
    ];
}


// Check validation errors and return errors
function checkValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Go to next middleware
}

// Exportera moduler
module.exports = { validateUserFormInput, validateWorkForm, validateId, checkValidationResult };
