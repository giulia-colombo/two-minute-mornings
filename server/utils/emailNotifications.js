// const { config } = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk'); // NOTE this might not work since SIB name changed to Brevo
// TO DO: pass down user details (use jwt middleware?)

const _sendEmail = emailDetails => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance; // REVIEW is this called defaultClient because we use this object to make requests to the Sendinblue API?

  const apiKey = defaultClient.authentications['api-key']; // REVIEW how does this compare to making API calls to a URL? Also, we're using bracket notation here, why?
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY; // REVIEW why are API keys necessary? is it just for public APIs? is it  when we want to make post/put/delete requests? or something else?

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi(); // REVIEW let's really understand this line

  // REVIEW is the below a higher-order function - since it returns a function?
  return apiInstance.sendTransacEmail(emailDetails).catch(err => {
    logger.error('Error sending email: ', err);
    throw err;
  });
};

const sendReminderEmail = (toEmail, userName) => {
  logger.info(`Sending reminder email to ${toEmail} with name ${userName}`);

  const reminderEmailConfig = {
    subject: `${userName}, you forgot something...`,
    htmlContent: `<p>Dear ${userName},\n\n I noticed you haven't filled in all your prompts today. Why not journal before going to bed? I promise you will feel better 💜 </p>`,
    userName,
    toEmail,
  };
  const reminderEmailDetails = createEmailDetails(reminderEmailConfig);
  _sendEmail(reminderEmailDetails);
};

const sendWelcomeEmail = (toEmail, userName) => {
  logger.info(`Sending welcome email to ${toEmail} with name ${userName}`);

  const welcomeEmailConfig = {
    subject: 'Welcome to Two Minute Mornings 📔',
    htmlContent: `<p>Welcome to Two Minute Mornings ${userName}! We are so happy that you are here 💜 </p>`,
    userName,
    toEmail,
  };

  const welcomeEmailDetails = createEmailDetails(welcomeEmailConfig);
  _sendEmail(welcomeEmailDetails);
};

const createEmailDetails = ({ subject, htmlContent, userName, toEmail }) => {
  const emailDetails = new SibApiV3Sdk.SendSmtpEmail();

  emailDetails.sender = {
    name: 'Two Minute Mornings',
    email: 'noreply@twominutemornings.com',
  };
  emailDetails.subject = subject;
  emailDetails.htmlContent = htmlContent;
  emailDetails.to = [
    {
      email: toEmail,
      name: userName,
    },
  ];

  return emailDetails;
};

export default emailNotifications;

// module.exports = {
//   sendReminderEmail,
//   sendWelcomeEmail,
// };
