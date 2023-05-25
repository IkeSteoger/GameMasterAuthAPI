'use strict';

const express = require('express');
const router = express.Router();
const { tabletopGamesModel } = require('../models/index');
const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');

router.post('/tabletopGames', bearerAuth, acl('create'), async (request, response, next) => {
  try {
    let tabletopGames = await tabletopGamesModel.create(request.body);
  
    response.status(200).send(tabletopGames);
  } catch(err) {
    next(err);
  }
});

router.get('/tabletopGames', basicAuth, async (request, response, next) => {
  try {
    let tabletopGames = await tabletopGamesModel.read();
    
    response.status(200).send(tabletopGames);
  } catch(err) {
    next(err);
  }
});

router.get('/tabletopGames/:id', basicAuth, async (request, response, next) => {
  try {
    let tabletopGames = await tabletopGamesModel.read(request.params.id);
  
    response.status(200).send(tabletopGames);
  } catch(err) {
    next(err);
  }
});

router.put('/tabletopGames/:id', bearerAuth, acl('update'), async (request, response, next) => {
  try {
    await tabletopGamesModel.update(request.body, request.params.id);
    let updatedTabletopGames = await tabletopGamesModel.read(request.params.id);
    response.status(200).send(updatedTabletopGames);
  } catch(err) {
    next(err);
  }
});

router.delete('/tabletopGames/:id', bearerAuth, acl('delete'), async (request, response, next) => {
  try {
    const deletedGame = await tabletopGamesModel.delete(request.params.id);
    response.status(200).send(deletedGame);
  } catch(err) {
    next(err);
  }
});

module.exports = router;