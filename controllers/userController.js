//Imports
const db = require('../models'); // Importing db from index.js
const bcrypt = require('bcrypt'); // Importing bcrypt
const jwt = require('jsonwebtoken'); //Importig JWT
require("dotenv").config(); // Importing .env

// Create main Model
const User = db.user;

// Function to add a new user
const createUser = async (req, res) => {
    try {
        // Extracting user information from the request body
        const password = await bcrypt.hash(req.body.password, 10);

        let info = {
            username: req.body.username,
            password: password,
        }

        // Checking if the user already exists
        const existingUser = await User.findOne({ where: { username: info.username } });

        if (existingUser) {
            // If user already exists, return a 409 Conflict status code
            return res.status(409).json({ message: "User already exists" });
        }

        // Creating a new user in the database
        const user = await User.create(info);

        // Returning the newly created user as JSON response
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
}

// Function to log in a user
const loginUser = async (req, res) => {
    try {
        let info = {
            username: req.body.username,
            password: req.body.password
        }

        // Find user by username
        const user = await User.findOne({ where: { username: info.username } });

        // If user doesn't exist, return a 401 Unauthorized status code
        if (!user) {
            return res.status(401).json({ message: "Felaktigt användarnamn/lösenord" });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(info.password, user.password);

        if (!passwordMatch) {
            // If passwords don't match, return a 401 Unauthorized status code
            return res.status(401).json({ message: "Felaktigt användarnamn/lösenord" });
        } else {
            // Create payload for JWT token
            const payload = info;
            // Create token with expiry time of 1 hour
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            const response = {
                message: "User logged in",
                token: token,
            }

            // Return response object
            return res.status(200).json({ response });
        }
    } catch (error) {
        // Handle errors and send a 500 status code with an error message
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'An error occurred while logging in the user.' });
    }
}

module.exports = { createUser, loginUser }
