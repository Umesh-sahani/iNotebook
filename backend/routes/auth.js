const express = require('express');
const User = require('../models/User');
const router = express.Router();
// import package from express-validator 
const { body, validationResult } = require('express-validator');
// import bcryptjs for password hashing and jwtwebtoken
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'BalSavi Studio is best';

//Route: 1 Create a User using: POST "api/auth/createUser" login no required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Length must be minimum length 5').isLength({ min: 5 })
], async (req, res) => {
    //If any error ocur, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check wheather the user this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Alert!! a user with this email already exists" });
        }
        // password hashing mechanism
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route: 2 Authenticate a user using : POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Can\'\t Blnak').exists(),
], async (req, res) => {
    //If any error ocur, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // fetch email and password from body 
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Please Enter Correct Credentials" });
        }
        const passwordCopmare = await bcrypt.compare(password, user.password);
        if (!passwordCopmare) {
            return res.status(400).json({ error: "Please Enter Correct Credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});

//Route: 3 Get loggedin user details using : POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user.name);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});

module.exports = router;