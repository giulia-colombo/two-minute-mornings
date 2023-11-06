const getIncompletePromptUsers = require("../utils/getIncompletePromptUsers");
const sendEmail = require("../utils/notifications/emailNotifications");
const schedule = require("node-schedule");

const reminderEmailJob = () => {
  //at 8pm send email to these users inviting them to fill in the prompts
  //create cron job for 8 pm every day
  schedule.scheduleJob({ hour: 20, minute: 0 }, () => {
    const incompletePropUsers = getIncompletePromptUsers();

    incompletePropUsers.forEach((user) => {
      sendEmail.sendReminderEmail(user.email, user.username);
    });
  });
};

module.exports = reminderEmailJob;
