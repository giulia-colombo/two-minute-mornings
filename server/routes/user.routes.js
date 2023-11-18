const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Entry = require('../models/Entry.model');

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

module.exports = router;
