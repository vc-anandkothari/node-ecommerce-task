// #region require section
const mongoose = require('mongoose');
const constants = require('../constants/constants');
require('dotenv').config();
// #endregion

/* Below code is exporting a function that connects to a MongoDB database using
Mongoose. */
module.exports = () => {
  try {
    mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(constants.DATABASE_CONNECTION_SUCCESS);
  } catch (error) {
    console.log(error);
    throw e;
  }
};
