'use strict';

const express = require('express');
const router = express.Router();
const { videoGamesModel } = require('../models/index');
const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');

router.post('/videoGames', bearerAuth, acl('create'), async (request, response, next) => {
  try {
    let videoGames = await videoGamesModel.create(request.body);

    response.status(200).send(videoGames);
  } catch (err) {
    next(err);
  }
});

router.get('/videoGames', basicAuth, async (request, response, next) => {
  try {
    let videoGames = await videoGamesModel.read();

    response.status(200).send(videoGames);
  } catch (error) {
    next(error);
  }
});

router.get('/videoGames/:id', basicAuth, async (request, response, next) => {
  try {
    let videoGames = await videoGamesModel.read(request.params.id);

    response.status(200).send(videoGames);
  } catch (error) {
    next(error);
  }
});

router.put('/videoGames/:id', bearerAuth, acl('update'), async (request, response, next) => {
  try {
    await videoGamesModel.update(request.body, request.params.id);
    let updatedvideoGames = await videoGamesModel.read(request.params.id);
    response.status(200).send(updatedvideoGames);
  } catch (error) {
    next(error);
  }

});

router.delete('/videoGames/:id', bearerAuth, acl('delete'), async (request, response, next) => {
  try {
    const deletedGame = await videoGamesModel.delete(request.params.id);
    response.status(200).send(deletedGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
