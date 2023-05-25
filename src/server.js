'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');


// Esoteric Resources
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRoutes = require('./auth/routes.js');
const videoGameRoutes = require('./routes/video-games.js');
const tabletopRoutes = require('./routes/table-top-games.js');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(videoGameRoutes);
app.use(tabletopRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send('Server is alive!!!');
});


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
