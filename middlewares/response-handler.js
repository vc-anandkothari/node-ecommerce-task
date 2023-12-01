/* The code is exporting a function that takes in several parameters: `res`, `statusCode`, `message`,
`data`, and `error`. */
module.exports = (res, statusCode, message, data = [], error = []) => {
  const responsePayload =
    data && data.data
      ? { statusCode, message, ...data, error }
      : { statusCode, message, data, error };

  return res.status(statusCode).send(responsePayload);
};
