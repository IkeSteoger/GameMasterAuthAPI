'use strict';

const express = require('express');
const router = express.Router();
const { tabletopGamesModel } = require('../models/index');

router.post('/tabletopGames', async (request, response, next) => {
  let tabletopGames = await tabletopGamesModel.create(request.body);

  response.status(200).send(tabletopGames);
});

router.get('/tabletopGames', async (request, response, next) => {
  let tabletopGames = await tabletopGamesModel.read();

  response.status(200).send(tabletopGames);
});

router.get('/tabletopGames/:id', async (request, response, next) => {
  let tabletopGames = await tabletopGamesModel.read(request.params.id);

  response.status(200).send(tabletopGames);
});

router.put('/tabletopGames/:id', async (request, response, next) => {
  await tabletopGamesModel.update(request.body, request.params.id);
  let updatedTabletopGames = await tabletopGamesModel.read(request.params.id);
  response.status(200).send(updatedTabletopGames);
});

router.delete('/tabletopGames/:id', async (request, response, next) => {
  try {
    const deletedGame = await tabletopGamesModel.delete(request.params.id);
    response.status(200).send(deletedGame);
  } catch(err) {
    next(err);
  }
});

module.exports = router;