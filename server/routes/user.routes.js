import logger from '../logs/logger.js';

// const router = require('express').Router();
import express, { urlencoded } from 'express';
const router = express.Router();
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// const User = require('../models/User.model');
import { User } from '../models/User.model.js';
// const Entry = require('../models/Entry.model');
import { Entry } from '../models/Entry.model.js';
import { isAuthenticated } from '../middleware/jwt.middleware.js';

//GET - /api/users/:userId - display profile of a user
router.get('/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  //only show that profile if userId corresponds to the userId of the logged in user

  if (userId === req.payload._id) {
    User.findById(userId)
      .then(oneUser => {
        logger.info(oneUser);
        res.json(oneUser);
      })
      .catch(err => logger.info(err));
  } else {
    res.status(404).send();
  }
});

//PUT api/users/:userId - update a user by its id
router.put('/users/:userId', isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;

  if ((userId = req.payload._id)) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      updatedUser(save);
      res.json(updatedUser);
    } catch (err) {
      logger.info('Error updating user details: ', err);
    }
  }
});

//DELETE api/users/:userId - delete a user
router.delete('/users/:userId', isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;

  // deletes entries for user
  if (userId === req.payload._id) {
    try {
      await Entry.deleteMany({ creator: userId });
      await User.findByIdAndRemove(userId);

      res.json({ message: `User and entries deleted successfully.` });
    } catch (err) {
      logger.info('Error while deleting user: ', err);
      res.status(500).json({ message: 'Error deleting users and entries.' });
    }
  } else {
    res
      .status(403)
      .json({ message: "You don't have permission to delete this user." });
  }
});

// module.exports = router;
export default router;
