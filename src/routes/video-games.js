'use strict';

const express = require('express');
const router = express.Router();
const { videoGamesModel, tabletopGamesModel } = require('../models/index');

router.post('/videoGames', async (request, response, next) => {
  let videoGames = await videoGamesModel.create(request.body);

  response.status(200).send(videoGames);
});

router.get('/videoGames', async (request, response, next) => {
  let videoGames = await videoGamesModel.read();

  response.status(200).send(videoGames);
});

router.get('/videoGamesAndTabletop', async (request, response, next) => {
  let videoGames = await videoGamesModel.read(null, {
    include: {model: tabletopGamesModel},
    where: {released: request.query.released},
  });
  response.status(200).send(videoGames);
});

router.get('/videoGames/:id', async (request, response, next) => {
  let videoGames = await videoGamesModel.read(request.params.id);

  response.status(200).send(videoGames);
});

router.put('/videoGames/:id', async (request, response, next) => {
  await videoGamesModel.update(request.body, request.params.id);
  let updatedvideoGames = await videoGamesModel.read(request.params.id);
  response.status(200).send(updatedvideoGames);
});

router.delete('/videoGames/:id', async (request, response, next) => {
  try {
    const deletedGame = await videoGamesModel.delete(request.params.id);
    response.status(200).send(deletedGame);
  } catch(err) {
    next(err);
  }
});

module.exports = router;