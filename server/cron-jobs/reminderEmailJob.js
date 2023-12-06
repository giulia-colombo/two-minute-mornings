import { getUsersWithIncompleteEntries } from '../utils/getUsersWithIncompleteEntries.js';
import schedule from 'node-schedule';
import { sendReminderEmail } from '../utils/emailNotifications.js';
import logger from '../logs/logger.js';
// TO DO: we need to pass down user.email and user.name

export const reminderEmailJob = () => {
  // REVIEW naming
  //at 8pm send email to these users inviting them to fill in the prompts
  //create cron job for 8 pm every day
  const scheduleReminderEmails = () =>
    schedule.scheduleJob({ hour: 20, minute: 0 }, async () => {
      const usersWithIncompleteEntries = await getUsersWithIncompleteEntries();

      // TO DO: sendReminderEmail is async, we need to handle errors
      // we need a promise combinator bc we want to perform an async action on several elements
      const reminderEmailPromises = usersWithIncompleteEntries.map(user =>
        sendReminderEmail(user.email, user.name)
      );

      const reminderEmailResults = await Promise.allSettled(
        reminderEmailPromises
      );

      reminderEmailResults.forEach(promiseResult => {
        if (promiseResult.status === 'rejected') {
          logger.error(promiseResult.reason);
        }
      });
    });

  scheduleReminderEmails();
};
