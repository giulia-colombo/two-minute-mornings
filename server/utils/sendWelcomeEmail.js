const { config } = require("dotenv");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendWelcomeEmail = (toEmail, userName) => {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

    console.log('Sending welcome email to', toEmail, 'with name', userName);

const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.subject = "Welcome to Two Minute Morning!";
sendSmtpEmail.htmlContent = `<p>Thanks for signing up for the Two Minute Mornings App, ${userName}!</p>`;
sendSmtpEmail.sender = {name: "Two Minute Mornings", email: "noreply@twominutemornings.com"};
sendSmtpEmail.to = [{email: toEmail}];

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.sendTransacEmail(sendSmtpEmail)
    .then(data => console.log("Email sent successfully:", data))
    .catch(err => console.log("Error sending email: ", err))
}

module.exports = sendWelcomeEmail;
