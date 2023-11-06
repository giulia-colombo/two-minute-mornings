// const morgan = require("morgan");
// const fs = require("fs");
// const path = require("path");

// let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"))

// //the format fn will be called with 3 args: tokens, req, res where tokens -->  object with all defined tokens
// //the format fn needs to return a string that will be the log line, or undefined / null to skip logging

// //morgan.token needs to be invoked with the name and a cb function. The cb function is expected to return a string value.
// // define userId token
// morgan.token("userId", (req, res) => {
//   return req.user && req.user.id ? req.user.id : "-";
// });

// //define token: ISO date of each log entry
// morgan.token("isoDate", (req, res) => {
//   const createdAtDate = req.body.createdAt
//   const createdAtString = createdAtDate.toISOString()
//   return req.body && createdAtDate ? createdAtString : "-"
// })

// //define token: prompt length of each entry
// //
// morgan.token("focusPromptLength", (req, res) => {
//   return req.body && req.body.focusPrompt ? req.body.focusPrompt.length : "-"
// })

// morgan.token("gratefulPromptLength", (req, res) => {
//   return req.body && req.body.gratefulPrompt ? req.body.gratefulPrompt.length : "-"
// })

// morgan.token("letGoPromptLength", (req, res) => {
//   return req.body && req.body.letGoPrompt ? req.body.letGoPrompt.length : "-"
// })

// //define token: message
// morgan.token("message", (req, res) => {
//   //we need to capture whenever the user creates an entry (doesn't have to be a full 3 prompt, any writing activity is good)
//   return req.method ==="POST" && req.url === "/entries" ? "blogged" : "-";
// })

// morgan(`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
//  "userId" "isoDate" "focusPromptLength" "gratefulPromptLength" "letGoPromptLength" "message"`, {stream: accessLogStream});



// module.exports = morgan;
