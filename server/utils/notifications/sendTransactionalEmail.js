const { config } = require("dotenv");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const schedule = require("node-schedule");
const getIncompletePromptUsers = require("../getIncompletePromptUsers");

sendTransactionalEmail = (toEmail, emailHtmlContent, emailSubject) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SENDINBLUE_API_KEY;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = emailSubject;
  sendSmtpEmail.htmlContent = emailHtmlContent;
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

module.exports = sendTransactionalEmail;
