const { validationResult } = require('express-validator');

class validation {
    async fildesValidate(req, res, next) {
        let result = await validationResult(req)
        let errors = []
        if (!result.isEmpty()) {
            result.array().forEach((error) => {
                errors.push(error.msg)
            })
            res.status(403);
            res.json({
                success: false,
                message: 'validation error',
                errors
            })
        } else {
            next()
        }
    }
}

module.exports = new validation();