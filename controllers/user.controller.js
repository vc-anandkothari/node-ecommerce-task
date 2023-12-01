// #region require section
const User = require('../schema/user.schema');
const STATUS_CODE = require('../constants/status-code');
const USER_CONSTANTS = require('../constants/user.constants');
// #endregion

// #endregion api's

/* The code `exports.getUsers = async function getUsers(req, res) { ... }` is exporting a function
named `getUsers` as a property of the `exports` object. This function is an asynchronous function
that handles a GET request to retrieve a list of users. */
exports.getUsers = async function getUsers(req, res) {
  try {
    const users = await User.find();

    res.status(STATUS_CODE.OK.code).send({
      message: USER_CONSTANTS.USER_LIST_SUCCESS,
      users,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The code `exports.createUser = async function createUser(req, res) { ... }` is exporting a function
named `createUser` as a property of the `exports` object. This function is an asynchronous function
that handles a POST request to create a new user. */
exports.createUser = async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(STATUS_CODE.OK.code).send({
      message: USER_CONSTANTS.ADD_USER_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};
/* The code `exports.updateUser` is exporting a function named `updateUser` as a property of the
`exports` object. This function is an asynchronous function that handles a POST request to update a
user. */
exports.updateUser = async function updateUser(req, res) {
  try {
    await User.updateOne({ _id: req.body.id }, req.body);
    res.status(STATUS_CODE.OK.code).send({
      message: USER_CONSTANTS.UPDATE_USER_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The code `exports.deleteUser` is exporting a function named `deleteUser` as a property of the
`exports` object. This function is an asynchronous function that handles a DELETE request to delete
a user. */
exports.deleteUser = async function deleteUser(req, res) {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(STATUS_CODE.OK.code).send({
      message: USER_CONSTANTS.DELETE_USER_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};
// #endregion
