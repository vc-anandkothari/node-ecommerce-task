const jwt = require('jsonwebtoken');
require('dotenv').config();
const STATUS_CODE = require('../constants/status-code');
const AUTH_CONSTANTS = require('../constants/auth.constants');

/**
 * The `authenticateToken` function is used to authenticate a JSON Web Token (JWT) by verifying its
 * authenticity using a secret key.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send a response
 * back to the client.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function or to the final route handler.
 * @returns a response with a status code and a JSON object containing a code and a message.
 */
function authenticateToken(req, res, next) {
  const token = req.header('Bearer');

  if (!token)
    return res.status(STATUS_CODE.UNAUTHORIZED.code).json({
      code: STATUS_CODE.UNAUTHORIZED.code,
      message: AUTH_CONSTANTS.INVALID_TOKEN,
    });

  /* The code `jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {...})` is verifying the
  authenticity of a JSON Web Token (JWT). */
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
      return res.status(STATUS_CODE.BAD_REQUEST.code).json({
        code: STATUS_CODE.BAD_REQUEST.code,
        message: AUTH_CONSTANTS.INVALID_TOKEN,
      });

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
