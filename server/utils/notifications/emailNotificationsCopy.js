const { config } = require("dotenv");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const schedule = require("node-schedule");
const getIncompletePromptUsers = require("../getIncompletePromptUsers");

const sendReminderEmail = (toEmail, userName) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SENDINBLUE_API_KEY;

  console.log("Sending welcome email to", toEmail, "with name", userName);

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "You forgot something...";
  sendSmtpEmail.htmlContent = `<p>Dear ${userName},\n\n I noticed you haven't filled in all your prompts today. Why not journal before going to bed? You will feel better :) </p>`;
  sendSmtpEmail.sender = {
    name: "Two Minute Mornings",
    email: "noreply@twominutemornings.com",
  };
  sendSmtpEmail.to = [{ email: toEmail }];

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  apiInstance
    .sendTransacEmail(sendSmtpEmail)

    .catch((err) => console.log("Error sending email: ", err));
};

exports.sendWelcomeEmail = (toEmail, userName) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SENDINBLUE_API_KEY;

  console.log("Sending welcome email to", toEmail, "with name", userName);

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Welcome to Two Minute Morning!";
  sendSmtpEmail.htmlContent = `<p>Thanks for signing up for the Two Minute Mornings App, ${userName}!</p>`;
  sendSmtpEmail.sender = {
    name: "Two Minute Mornings",
    email: "noreply@twominutemornings.com",
  };
  sendSmtpEmail.to = [{ email: toEmail }];

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((data) => console.log("Email sent successfully:", data))
    .catch((err) => console.log("Error sending email: ", err));
};

exports.reminderEmailJob = () => {
  //at 8pm send email to these users inviting them to fill in the prompts
  //create cron job for 8 pm every day
  schedule.scheduleJob({ hour: 20, minute: 0 }, function () {
    const incompletePropUsers = getIncompletePromptUsers();

    incompletePropUsers.forEach((user) => {
      sendReminderEmail(user.email, user.name);
    });
  });
};
