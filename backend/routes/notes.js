const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
// import package from express-validator 
const { body, validationResult } = require('express-validator');



//Route: 1 Get all the notes: GET "api/notes/fetchallnotes" required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({ notes });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route: 2 Add a new note using: POST "api/notes/addnote" | login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must have minmum 20 character').isLength({ min: 20 }),
], async (req, res) => {
    //If any error ocur, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //access elements via array destructuring
        const {title, description,tag} = req.body;  

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json({savedNote});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }

});

module.exports = router;