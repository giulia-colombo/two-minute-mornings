// const { expressjwt: jwt } = require('express-jwt');
import { expressjwt as jwt } from 'express-jwt';

// Instantiate the JWT token validation middleware
export const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload', //make the decoded JWT available on req.payload vs req.user
  getToken: getTokenFromHeaders, // passing a reference to our custom TokenGetter function
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    //if the first substring is equal to "Bearer"
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // Get the encoded token string and return it (substring after Bearer)
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create protected routes
// module.exports = {
//   isAuthenticated,
// };
