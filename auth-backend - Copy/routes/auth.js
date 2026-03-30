const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const User = require('../models/user'); // Make sure file name is user.js
const router = express.Router(); 

// Register Route 
router.post('/register', async (req, res) => { 
    try { 
        const { username, password } = req.body; 
        const exists = await User.findOne({ username }); 
        if (exists) return res.status(400).json({ message: 'User already exists' }); 

        const newUser = new User({ username, password }); 
        await newUser.save(); 
        res.status(201).json({ message: 'User registered' }); 
    } catch (err) { 
        console.error("FULL ERROR:", err); 
        res.status(500).json({ message: 'Error registering user', error: err.message }); 
    } 
}); 

// Login Route 
router.post('/login', async (req, res) => { 
    try { 
        const { username, password } = req.body; 
        const userFound = await User.findOne({ username }); 
        if (!userFound) return res.status(400).json({ message: 'User not found' }); 

        const match = await bcrypt.compare(password, userFound.password); 
        if (!match) return res.status(401).json({ message: 'Invalid password' }); 

        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.json({ token }); 
    } catch (err) { 
        res.status(500).json({ message: 'Error logging in' }); 
    } 
}); 

module.exports = router;