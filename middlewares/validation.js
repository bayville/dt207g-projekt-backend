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

//Validate menuitem
function validateMenuItemFormInput() {
    return [
        body('name').trim().notEmpty().escape().withMessage("Namn måste fyllas i"),
        body('price').trim().notEmpty().isNumeric().escape().withMessage("Pris måste anges"),
        body('categoryId').trim().notEmpty().isInt().escape().withMessage("Kategori-ID måste anges"),
        body('description').trim().escape(),
    ];
}
//Validate id param
function validateId(){
    return[ param('id').notEmpty().isInt().withMessage("Id måste vara ett heltal") ]
}

// Validate category input
function validateCategoryInput() {
    return [
        body('name').trim().notEmpty().withMessage("Namnet måste fyllas i"),
        body('description').notEmpty().trim().escape(),
        body('order').isInt({ min: 0 }).withMessage("Order måste vara ett positivt heltal"),
    ];
}


// Check validation errors and return errors
function checkValidationResult(req, res, next) {
    const errors = validationResult(req);
    console.log("errors", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Go to next middleware
}

// Exportera moduler
module.exports = { validateUserFormInput, validateCategoryInput, validateId, validateMenuItemFormInput, checkValidationResult };
