module.exports = Object.freeze({
  PORT: '3000',
  HOST: '127.0.0.1',
  DATABASE_CONFIG_PATH: './config/db',
  DATABASE_CONNECTION_SUCCESS:
    'The database connection has been successfully established.',
  ROUTES: './routes/index',
  NODE_MAILER: {
    SERVICE: 'gmail',
    PORT: 465,
    SECURE: true,
  },
});
