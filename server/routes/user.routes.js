import logger from '../logs/logger.js';

// const router = require('express').Router();
import express from 'express';
const router = express.Router();
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// const User = require('../models/User.model');
import { User } from '../models/User.model.js';
// const Entry = require('../models/Entry.model');
import { Entry } from '../models/Entry.model.js';

//GET - display profile of 1 member
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

// module.exports = router;
export default router;
