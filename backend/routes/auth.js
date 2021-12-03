const express = require('express');
const User = require('../models/User');
const router = express.Router();
// import package from express-validator 
const { body, validationResult } = require('express-validator');

// Create a User using: POST "api/auth". Does't require login
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Length must be minimum length 5').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.json({ error: "Please Enter Unique Value for email.", message: err.message })
        });

});

module.exports = router;