import logger from '../logs/logger.js';
// const express = require('express');
import express from 'express';
const router = express.Router();

// ℹ️ Handles password encryption
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';

// ℹ️ Handles password encryption
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

// Require the User model in order to interact with the database
// const User = require('../models/User.model');
import { User } from '../models/User.model.js';

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
//const { isAuthenticated } = require('../middleware/jwt.middleware.js');
import { isAuthenticated } from '../middleware/jwt.middleware.js';
// const {
//   sendWelcomeEmail,
// } = require('../utils/notifications/emailNotifications');
import { sendWelcomeEmail } from '../utils/emailNotifications.js';

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post('/signup', (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: 'Provide email, password and name' });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then(foundUser => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: 'User already exists.' });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword, name });
    })
    .then(createdUser => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => next(err)); // In this case, we send error handling to the error handling middleware.

  sendWelcomeEmail(email, name);
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: 'User not found.' });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        //add the user_id property to the req object
        req.user_id = _id;

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'Unable to authenticate the user' });
      }
    })
    .catch(err => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  logger.info(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

router.post('/psw-reset/initiate', isAuthenticated, async (req, res, next) => {
  // Grab the email the user has inserted in the frontend via req.body
  const { email } = req.body;

  // Check if a user with that email exists.
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "Couldn't find email in the database." });
    }

    // Grab id and name from the user object.
    const { _id, name } = foundUser;

    // Create an object that will be set as the token payload.
    const payload = { _id, email, name, type: 'passwordReset' };

    //add the user_id property to the req object
    req.user_id = _id;

    // Create a JSON Web Token and sign it
    const pswResetToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });

    const pswResetURL = `${process.env.ORIGIN}/password-reset/${pswResetToken}`;

    //TO DO: code sendPswResetEmail
    await sendPswResetEmail(email, pswResetURL);

    // Send the token as the response
    res
      .status(200)
      .json({ message: 'Password reset email sent successfully.' });
  } catch (err) {
    logger.error('Error rietriving user in the database. ', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/psw-reset/validate/:pswResetToken', (req, res, next) => {
  // TO DO
  // 1. grab the token from req.params
  const { pswResetToken } = req.params;

  try {
    // 2. Check validity of token:
    jwt.verify(pswResetToken, process.env.TOKEN_SECRET);
    // 3. Send back a response to the frontend that communicates that the token is still valid
    res
      .status(200)
      .json({ message: 'Password reset token has been validated.' });
  } catch (err) {
    // 4. OR Send back a response to the frontend that communicates that the token is not valid anymore
    logger.error('Could not validate password reset token: ', err);
    res
      .status(500)
      .json({ message: 'Password reset token is invalid or has expired.' });
  }
});

export default router;
