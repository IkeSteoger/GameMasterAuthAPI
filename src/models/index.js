'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/models/users.js');
const tabletopGames = require('./tabletopGames/index.js');
const videoGames = require('./videoGames/index.js');
const Collection = require('./collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const tabletopGamesModel = tabletopGames(sequelize, DataTypes);
const videoGamesModel = videoGames(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  videoGamesModel: new Collection(videoGamesModel),
  tabletopGamesModel: new Collection(tabletopGamesModel),
  users: userModel(sequelize, DataTypes),
};