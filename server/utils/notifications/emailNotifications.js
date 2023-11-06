const { config } = require("dotenv");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const schedule = require("node-schedule");
const getIncompletePromptUsers = require("../getIncompletePromptUsers");

const _sendEmail = (emailDetails) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
process.env.SENDINBLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  return apiInstance
    .sendTransacEmail(emailDetails)

    .catch((err) => console.log("Error sending email: ", err));
}

const sendReminderEmail = (toEmail, userName) => {

  console.log("Sending welcome email to", toEmail, "with name", userName);

  const emailDetails = new SibApiV3Sdk.SendSmtpEmail();

  emailDetails.subject = "You forgot something...";
  emailDetails.htmlContent = `<p>Dear ${userName},\n\n I noticed you haven't filled in all your prompts today. Why not journal before going to bed? You will feel better :) </p>`;
  emailDetails.sender = {
    name: "Two Minute Mornings",
    email: "noreply@twominutemornings.com",
  };
  emailDetails.to = [{ email: toEmail }];
  _sendEmail(emailDetails);
  };

const sendWelcomeEmail = (toEmail, userName) => {

  console.log("Sending welcome email to", toEmail, "with name", userName);

  const emailDetails = new SibApiV3Sdk.SendSmtpEmail();

  emailDetails.subject = "Welcome to Two Minute Morning!";
  emailDetails.htmlContent = `<p>Thanks for signing up for the Two Minute Mornings App, ${userName}!</p>`;
  emailDetails.sender = {
    name: "Two Minute Mornings",
    email: "noreply@twominutemornings.com",
  };
  emailDetails.to = [{ email: toEmail }];

  _sendEmail(emailDetails);

};


module.exports = {
  sendReminderEmail,
  sendWelcomeEmail
}