import logger from '../logs/logger.js';

// const router = require('express').Router();
import express from 'express';
const router = express.Router();

// const Entry = require('../models/Entry.model');
import { Entry } from '../models/Entry.model.js';
// const User = require('../models/User.model');
import { User } from '../models/User.model.js';
// const { isAuthenticated } = require('../middleware/jwt.middleware');
import { isAuthenticated } from '../middleware/jwt.middleware.js';
import {
  getMonthWithMostEntriesYear,
  getMonthWithMostEntriesEver,
  getTotalDaysJournaled,
  getLongestPromptOnAvg,
} from '../stats/stats.js';

// GET /api/entries
router.get('/entries', isAuthenticated, async (req, res, next) => {
  const creator = req.payload._id;
  try {
    const allEntries = await Entry.find({ creator: creator });
    res.json(allEntries);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal server error');
  }
});

// GET /api/entries/:entryId REVIEW do we need this?
router.get('/entries/:entryId', isAuthenticated, async (req, res, next) => {
  const { entryId } = req.params;
  const creatorId = req.payload._id;
  logger.info('creatorId ==> ', creatorId);

  const foundUser = await User.findById(creatorId);
  logger.info('foundUser ===> ', foundUser);

  if (foundUser.entries.includes(entryId)) {
    Entry.findById(entryId)
      .then(oneEntry => {
        logger.info(oneEntry);
        res.json(oneEntry);
      })
      .catch(err => logger.info(err));
  } else {
    res.status(404).send();
  }
});

// POST /api/entries
router.post('/entries', isAuthenticated, async (req, res, next) => {
  const { focusPrompt, gratefulPrompt, letGoPrompt } = req.body;
  logger.info('req.body ===> ', req.body);

  const creator = req.payload._id;

  try {
    //create the Entry in the db
    const newEntry = await Entry.create({
      focusPrompt,
      gratefulPrompt,
      letGoPrompt,
      creator,
    });
    //push created Entry into the array of Entries for the current User/creator
    const entryCreator = await User.findById(creator);
    entryCreator.entries.push(newEntry);
    entryCreator.save();
    res.json({ newEntry, entryCreator });
  } catch (err) {
    logger.info('Error while creating a new entry: ', err);
  }
});

// PUT /api/entries/:entryId (update an entry by its id)
router.put('/entries/:entryId', isAuthenticated, async (req, res, next) => {
  const { entryId } = req.params;

  // const {focusPrompt, gratefulPrompt, letGoPrompt} = req.body;

  const creatorId = req.payload._id;
  logger.info('creatorId ==> ', creatorId);

  const foundUser = await User.findById(creatorId);
  logger.info('foundUser ===> ', foundUser);

  if (foundUser.entries.includes(entryId)) {
    try {
      const editedEntry = await Entry.findByIdAndUpdate(entryId, req.body, {
        new: true,
      });
      editedEntry.save();
      res.json(editedEntry);
    } catch (err) {
      logger.info('Error while updating the entry: ', err);
    }
  }
});

// DELETE /api/entries/:entryId
//must delete the entry document and also remove it from the [entries] of the User/creator
router.delete('/entries/:entryId', isAuthenticated, async (req, res, next) => {
  const { entryId } = req.params;

  const creatorId = req.payload._id;
  logger.info('creatorId ==> ', creatorId);

  const foundUser = await User.findById(creatorId);
  logger.info('foundUser ===> ', foundUser);

  if (foundUser.entries.includes(entryId)) {
    try {
      const entryToDelete = await Entry.findById(entryId);
      logger.info('entryToDelete: ', entryToDelete);
      //must find the User creator, then grab [entries], then splice the entryToDelete
      const creatorId = entryToDelete.creator;
      const creator = await User.findById(creatorId);
      logger.info('creator: ', JSON.stringify(creator, null, 2));
      logger.info('creator.entries ==> ', creator.entries);
      const entryIndex = creator.entries.indexOf(entryId);
      logger.info('entryIndex: ', entryIndex);
      creator.entries.splice(entryIndex, 1);
      logger.info('current entries: ', creator.entries);
      creator.save();

      await Entry.findByIdAndRemove(entryId);
      res.json({ message: `Entry with entryId ${entryId} has been removed.` });
    } catch (err) {
      logger.info('Error while deleting the entry: ', err);
    }
  }
});

//GET - filter entries by month and year
router.get('/entries', isAuthenticated, async (req, res) => {
  try {
    const { year, month } = req.query;

    const filteredEntries = await Entry.find({ year, month });

    res.json(filteredEntries);
  } catch {
    logger.info(err);
    res.status(500).send('Server error');
  }
});

// GET - stats page for the user.
router.get('/entries/stats', isAuthenticated, async (req, res) => {
  const userId = req.payload._id;
  // const { year } = req.query;

  try {
    // display the values resulting from our metric calculations
    //import stats.js file
    //call the respective functions for every stat and assign them to a variable

    // month with most entries for a year for user
    // TO DO: where do we get the year param?

    // let monthWithMostEntriesYear = null;

    // if (year) {
    //   monthWithMostEntriesYear = await getMonthWithMostEntriesYear(
    //     userId,
    //     year
    //   );
    // }

    // month with most entries ever for user
    const monthWithMostEntriesEver = await getMonthWithMostEntriesEver(userId);

    // total days journaled for user
    const totalDaysJournaled = await getTotalDaysJournaled(userId);

    // longest prompt on avg for user
    // TO DO: where do we get the ...prompts param??? check in stats.js that part also
    const longestPromptOnAvg = await getLongestPromptOnAvg(userId);

    // if successful, send them back (in what form?)
    res.json({
      // monthWithMostEntriesYear,
      monthWithMostEntriesEver,
      totalDaysJournaled,
      longestPromptOnAvg,
    });
  } catch (err) {
    // display error in console
    logger.error(err);
    //set error status and send back response with error
    res.status(500).send('Error retrieving stats', err);
  }
});

export default router;
