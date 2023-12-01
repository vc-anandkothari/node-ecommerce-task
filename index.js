const express = require('express');
const constants = require('./constants/constants');

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require(constants.DATABASE_CONFIG_PATH)();

app.use(require(constants.ROUTES));

app.listen(constants.PORT, () => {
  console.log(`Server running on http://${constants.HOST}:${constants.PORT}/`);
});
