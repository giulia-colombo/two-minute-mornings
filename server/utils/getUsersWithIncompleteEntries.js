// const User = require('../models/User.model');
// const Entry = require('../models/Entry.model');
import { User } from '../models/User.model.js';
import { Entry } from '../models/Entry.model.js';
import logger from '../logs/logger.js';

const getAllUsers = async () => {
  try {
    return await User.find(); // returns an array of User documents (JS objects), instances of the User mongoose model satisfying the conditions ✅
  } catch (err) {
    logger.error('Error getting all users from the database.');
    throw new Error('Error getting all users from the database.');
  }
};

// return an array of Users that have no entries.
const getUsersWithNoEntries = async () => {
  try {
    const allUsers = await getAllUsers();
    const usersWithNoEntries = allUsers.filter(
      user => user.entries.length === 0
    );
    return usersWithNoEntries; // returns an array of User documents (JS objects), instances of the User mongoose model satisfying the conditions ✅
  } catch (error) {
    logger.error('Error fetching users with no entries.');
    throw new Error('Error fetching users with no entries.');
  }
};

// returns the completed entry for the current day, for the user, if it exists. Otherwise, the array will be empty.
const checkIfCompletedEntryToday = async user => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const completedEntryToday = await Entry.find({
      creator: user._id,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      focusPrompt: { $ne: '' },
      letGoPrompt: { $ne: '' },
      gratefulPrompt: { $ne: '' },
    });

    // if completedEntryToday is an empty array (ie there's no completed entry for today) return the user.
    if (completedEntryToday.length === 0) return user;
    // else, return nothing.
    return null;

    // if completedEntryToday DOES NOT exist, return the user aka creator of that entry... but how can I, if the post entry doesnt exist, neither will the creator attached to it?
  } catch (err) {
    logger.error("Error finding today's entry");
    throw new Error("Error finding today's entry");
  }
};

// return Users that have not filled in all 3 prompts for the current day.
const getUsersWithIncompleteEntryToday = async () => {
  try {
    // array of elements where we want to perform an async operation on each element.
    const allUsers = await getAllUsers();

    // build array of promises  with .map
    const usersWithIncompleteEntryPromises = allUsers.map(user =>
      checkIfCompletedEntryToday(user)
    );

    // returns an array of objects that describe the outcome of each promise
    const usersWithIncompleteEntryResults = await Promise.allSettled(
      usersWithIncompleteEntryPromises
    );

    const usersWithIncompleteEntry = usersWithIncompleteEntryResults
      .filter(result => result.status === 'fulfilled' && result.value != null)
      .map(result => result.value);

    logger.info('usersWithIncompleteEntry', usersWithIncompleteEntry);
    return usersWithIncompleteEntry;
  } catch (err) {
    logger.error('Error in getUsersWithIncompleteEntryToday', err);
    throw err;
  }
};

// returns the 2 arrays we obtained, combined.
export const getUsersWithIncompleteEntries = async () => {
  try {
    const usersWithIncompleteEntry = await getUsersWithIncompleteEntryToday();
    const usersWithNoEntries = await getUsersWithNoEntries();

    const usersWithIncompleteEntries = [
      ...usersWithIncompleteEntry,
      ...usersWithNoEntries,
    ];

    logger.info(`usersWithIncompleteEntries: `, usersWithIncompleteEntries);

    return usersWithIncompleteEntries;
  } catch (error) {
    logger.error('Error getting the users with incomplete entries:', err);
  }
};
