const getIncompletePromptUsers = require("../utils/getIncompletePromptUsers");
const sendTransactionalEmail = require("../utils/notifications/sendTransactionalEmail");
const schedule = require("node-schedule");

const reminderEmailJob = () => {
  //at 8pm send email to these users inviting them to fill in the prompts
  //create cron job for 8 pm every day
  schedule.scheduleJob({ hour: 20, minute: 0 }, () => {
    const incompletePropUsers = getIncompletePromptUsers();

    const reminderEmailHtmlContent = `<p>Dear ${userName},\n\n I noticed you haven't filled in all your prompts today. Why not journal before going to bed? You will feel better :) </p>`;
    const reminderEmailSubject = "You forgot something...";

    incompletePropUsers.forEach((user) => {
      sendTransactionalEmail(
        user.email,
        reminderEmailHtmlContent,
        reminderEmailSubject
      );
    });
  });
};

module.exports = reminderEmailJob;
