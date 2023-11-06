const Entry = require('../models/Entry.model');

// 1. Month with the most entries of the year
// userId param  needs === creator
const getMonthWithMostEntriesYear = async (userId, year) => {
  try {
    const results = await Entry.aggregate([
      {
        $match: {
          creator: userId,
          createdAt: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' }, // $ -> aggregation operator, field reference (existing fields)
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 }, // "count" field tells us how many entries are associated with that year/month combo
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          month: '$_id.month',
          year: '$_id.year',
          count: true,
        },
      },
    ]);
    if (results.length === 0)
      throw new Error(
        "We couldn't find any entries for this month/year combo."
      );

    return results[0];
  } catch (err) {
    const aggrPipelineError = new Error(
      'Failed to fetch data. Please try again later.'
    );
    console.error(aggrPipelineError);
  }
};
// 2. Month with the most entries, ever
const getMonthWithMostEntriesEver = async userId => {
  try {
    const results = await Entry.aggregate([
      {
        $match: { creator: userId },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (results.length === 0)
      throw new Error(
        "Looks like we don't have enough data for this stat. Journal some more and come back later!"
      );

    return results[0];
  } catch (err) {
    const aggrPipelineError = new Error(
      'Failed to fetch data. Please try again later.'
    );
    console.error(aggrPipelineError);
    throw aggrPipelineError;
  }
};

// 3. Total days journaled, ever
// Answers the question: "How many unique Entries are there, based on the "createdAt" field?

const getTotalDaysJournaled = async userId => {
  try {
    const uniqueEntries = await Entry.distinct('createdAt', {
      creator: userId,
    });

    if (uniqueEntries.length === 0) return 0;

    return uniqueEntries.length;
  } catch (err) {
    const aggrPipelineError = new Error(
      'Failed to fetch data. Please try again later.'
    );
    console.error(aggrPipelineError);
    throw aggrPipelineError;
  }
};

// 4. Longest prompt on average, per user

// get the avg length for whatever prompt is passed, for that user
const getPromptAvgLength = async (userId, prompt) => {
  try {
    const promptLengthsAggregatedData = await Entry.aggregate([
      {
        $match: {
          creator: userId,
          // $and: [{ prompt: { $ne: '' } }, { prompt: { $eq: prompt } }],
          prompt: { $eq: prompt, $ne: '' },
        },
      },
      {
        $project: { promptLength: { $strLenCP: '$prompt' } },
      },
      {
        $group: {
          _id: null, //bc we want a single output.
          promptCount: { $sum: 1 },
          promptLengthTotal: { $sum: '$promptLength' },
        },
      },
      {
        $project: {
          averagePromptLength: {
            $divide: ['$promptLengthTotal', '$promptCount'],
          },
        },
      },
    ]);

    if (!promptLengthsAggregatedData.length)
      throw new Error(
        `You didn't fill in any ${prompt} prompt! Go journal and then come back to see what prompt inspired you to write the longest!`
      );
    return promptLengthsAggregatedData[0].averagePromptLength;
  } catch (err) {
    console.error(err.message);
    throw new Error(
      `Failed to fetch data for the ${prompt}. Please try again later`
    );
  }
};

// (...prompts) needs to be the array of all types of prompt that exist in the app, therefore in Entry.model (still need to work on this part - maybe it could be a global variable?). I removed the userId param because when we call getPromptAvgLength, we are already passing userId and filtering for entries created by the current user - right or wrong?
const getPromptLengthsArray = async (...globalPrompts) => {
  // This is a one line function, i dont think it makes sense to spin into its own separate function.
  const promptLengthPromises = globalPrompts.map(prompt =>
    getPromptAvgLength(prompt)
  );
  // console.log(promptAverageLengths);

  // Gives us array of objects. Every object is the result of 1 promise. This is a one line function, i dont think it makes sense to spin into its own separate function
  const promisesResults = await Promise.allSettled(promptLengthPromises);

  // Guard clause in case one of the promises fails. This loop is just throwing an error if there's a fail scenario, don't think i need to spin it into its own function.
  for (const result of promisesResults) {
    if (result.status === 'rejected') {
      const err = new Error(
        'It seems like we had an issues with the database. Please try again later'
      );
      console.error(err);
      throw err;
    }
  }

  // Maybe I could spin this into its own function, since it builds the array with the values of the avg lengths and the prompt names. Thoughts?

  return buildPromptArray(promisesResults);
};

const buildPromptArray = promisesResults => {
  const promptAverageLengths = [];
  promisesResults.forEach((prompt, i) => {
    promptAverageLengths.push({
      promptName: prompt,
      promptAvgLength: promisesResults[i].value,
    });
  });
  return promptAverageLengths;
};

const checkMaxAvgLength = promptAverageLengths => {
  let maxAvgLength = 0;
  let longestPrompt = null;

  promptAverageLengths.forEach(el => {
    if (el.promptAvgLength > maxAvgLength) {
      maxAvgLength = el.promptAvgLength;
      longestPrompt = el.promptName;
    }
  });
  return longestPrompt;
};

/// getLongestPromptOnAvg computes the avg length for all the prompts the user has written so far. Returns the prompt w the highest average
const getLongestPromptOnAvg = async (...prompts) => {
  try {
    const promptLengthsArray = await getPromptLengthsArray(...prompts);
    const longestPrompt = checkMaxAvgLength(promptLengthsArray);

    if (!longestPrompt)
      throw new Error(
        'There are no prompts to show. Go journal and come back to see your stats.'
      );

    return longestPrompt;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

getLongestPromptOnAvg();

module.exports = stats;
