'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/models/users.js');
// const tabletop
const Collection = require('./collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  db: sequelize,
  // videoGames: new Collection(videoGames),
  // boardGames: new Collection(boardGames),
  users: userModel(sequelize, DataTypes),
};