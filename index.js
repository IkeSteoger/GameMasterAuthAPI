'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models');
const PORT = process.env.PORT || 5002;

db.sync().then(() => {
  app.start(PORT || 3001);
});
