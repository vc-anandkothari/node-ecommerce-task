// #region require section
const { transporter } = require('../helpers/mailer');
const User = require('../schema/user.schema');
const jwt = require('jsonwebtoken');
const STATUS_CODE = require('../constants/status-code');
const AUTH_CONSTANTS = require('../constants/auth.constants');
require('dotenv').config();
// #endregion

// #region api's

/* The `exports.registerUser` function is responsible for handling the registration of a new user. It
receives the `req` (request) and `res` (response) objects as parameters. */
exports.registerUser = async function registerUser(req, res) {
  try {
    let existingUser = await User.findOne({
      email: req.body.email,
    });

    /* This code block is checking if there is an existing user with the same email address as the one
  provided in the request body. If an existing user is found, it returns a response with a status
  code of 400 (Bad Request) and an error message stating that the user already exists. This is used
  to prevent duplicate user registrations with the same email address. */
    if (existingUser) {
      return res.status(STATUS_CODE.BAD_REQUEST.code).send({
        message: STATUS_CODE.BAD_REQUEST.message,
        error: [
          {
            message: AUTH_CONSTANTS.USER_ALREADY_EXISTS,
          },
        ],
      });
    }

    // Generating 6 digit verification code
    const userVerificationCode = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      ...req.body,
      isVerified: false,
      userVerificationCode,
    });

    await user.save();

    /* The `mailOptions` object is used to configure the email that will be sent to the user after they
   register. It contains the following properties: */
    const mailOptions = {
      from: `"ViitorCloud" <${process.env.MAILER_EMAIL}>`,
      template: 'email',
      to: user.email,
      subject: `Welcome to ViitorCloud, ${user.name}`,
      context: {
        name: user.name,
        company: 'ViitorCloud',
        link: `http://localhost:3000/verify-user/${user._id}`,
      },
      html: `
        <h1>Dear ${user.name}, Welcome to ViitorCloud </h1>
        <p>Warm greetings from the ViitorCloud ! We're thrilled to announce that your registration has been successfully completed, and you are now officially part of our family.</p>
        <p>Your Verification Code is <b>${userVerificationCode}</b></p>
        <p><a href="http://localhost:3000/verify-user/${userVerificationCode}">Verification Link</a></p>`,
    };

    try {
      /* The code `transporter.sendMail(mailOptions, (error, info) => { ... })` is responsible for
     sending an email to the user after they register. */
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(STATUS_CODE.BAD_REQUEST.code).send({
            message: AUTH_CONSTANTS.ERROR_WHILE_REGISTERING_USER,
            error: [error],
          });
        } else {
          res.status(STATUS_CODE.OK.code).send({
            message: AUTH_CONSTANTS.REGISTER_USER_SUCCESS,
          });
        }
      });
    } catch (error) {
      res.status(STATUS_CODE.BAD_REQUEST.code).send({
        message: STATUS_CODE.BAD_REQUEST.message,
        error: [error],
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `verifyUser` function is responsible for verifying a user's account. It takes in the `req`
(request) and `res` (response) objects as parameters. */
exports.verifyUser = async function verifyUser(req, res) {
  try {
    const { verificationCode } = req.params;

    const user = await User.findOne({ userVerificationCode: verificationCode });

    if (!user) {
      return res.status(STATUS_CODE.NOT_FOUND.code).send({
        message: AUTH_CONSTANTS.USER_NOT_FOUND_OR_INVALID_TOKEN,
        error: [
          {
            message: AUTH_CONSTANTS.INVALID_VERIFICATION_CODE,
          },
        ],
      });
    }
    user.isUserVerified = true;
    user.userVerificationCode = null;
    await user.save();

    res.status(STATUS_CODE.OK.code).send({
      message: AUTH_CONSTANTS.USER_VERIFY_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `loginUser` function is responsible for handling the login functionality. It receives the `req`
(request) and `res` (response) objects as parameters. */
exports.loginUser = async function loginUser(req, res) {
  try {
    let userData = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!userData) {
      throw err;
    }

    /* This code block is checking if the user is verified or not before allowing them to log in. If the
   `isUserVerified` property of the `userData` object is `false`, it means that the user has not yet
   verified their account. In this case, the code returns a response with a status code of 401
   (Unauthorized) and an error message stating that the user needs to verify their account before
   logging in. This is used to prevent unverified users from accessing the system. */
    if (!userData.isUserVerified) {
      return res.status(STATUS_CODE.UNAUTHORIZED.code).send({
        message: STATUS_CODE.UNAUTHORIZED.message,
        error: [
          {
            message: AUTH_CONSTANTS.PLEASE_VERIFY_ACCOUNT,
          },
        ],
      });
    }
    const payload = {
      id: userData._id,
      name: userData.name,
      email: userData.email,
    };

    /* The `jwt.sign()` function is used to generate a JSON Web Token (JWT) for authentication purposes. */
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: 3600 * 24 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(STATUS_CODE.OK.code).send({
          message: AUTH_CONSTANTS.LOGIN_SUCCESS,
          token: token,
        });
      }
    );
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: AUTH_CONSTANTS.INVALID_EMAIL_PASSWORD,
      error: [error],
    });
  }
};
// #endregion
