'use strict';

// Load modules
const express = require('express');
const morgan = require('morgan');

// Create the Express app
const app = express();

const cors = require('cors');

// Imports Sequelize
const {sequelize} = require('./models');

// Import main routes
const routes = require('./routes');

// Variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Setup JSON parsing on request body
app.use(express.json());

app.use(cors());

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Inserts main routes
app.use('/api', routes);

// Tests the database connection
(async (req, res) => {
  try{
    await sequelize.authenticate();
    console.log('Database connection successful')
  } catch (error) {
    console.error('Unable to connect to database');
  }
})();

// Send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// Set our port
app.set('port', process.env.PORT || 5000);

// Start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
