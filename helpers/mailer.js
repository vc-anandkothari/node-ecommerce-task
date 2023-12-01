const nodemailer = require('nodemailer');
const CONSTANTS = require('../constants/constants');

/* This code exports a `transporter` object that is created using the `nodemailer.createTransport`
method. The `transporter` object is used to send emails using the Nodemailer library. */
exports.transporter = nodemailer.createTransport({
  service: CONSTANTS.NODE_MAILER.SERVICE,
  secure: CONSTANTS.NODE_MAILER.SECURE,
  port: CONSTANTS.NODE_MAILER.PORT,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
