'use strict';

const { app } = require('../src/server');
const { db, users } = require('../src/models');
const supertest = require('supertest');

const request = supertest(app);
let adminTest;

beforeAll(async () => {
  await db.sync();
  adminTest = await users.create({
    username: 'admin',
    password: 'pass',
    role: 'gameMaster',
  });
});

afterAll(async () => {
  await db.drop();
});


describe('Non-auth Routes', () => {

  test('proof of life', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
  
  test('404 on bad route', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  
  test('404 on bad method', async () => {
    const response = await request.post('/');
    expect(response.status).toEqual(404);
  });

});



describe('Auth Routes', () => {

  test('allow for signup', async () => {
    const response = await request.post('/signup').send({
      username: 'Tester', 
      password: 'pass',
      role: 'gameMaster',
    });

    expect(response.status).toEqual(201);
  });

  test('allow for signin', async () => {
    const response = await request.post('/signin').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });

  test('read all /videogames - requires basic auth', async () => {
    const response = await request.get('/videogames').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });

  test('read one /videogames/:id - requires basic auth', async () => {
    const response = await request.get('/videogames/1').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });

  test('create /videogames - requires bearer auth & acl-create', async () => {
    const response = await request.post('/videogames').send({
      name: 'halo',
      released: '2001',
      genre: 'fps',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

  test('update /videogames/:id - requires bearer auth & acl-update', async () => {
    const response = await request.put('/videogames/1').send({
      name: 'halo 2',
      released: '2004',
      genre: 'fps 2.0',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

  test('delete /videogames/:id - requires bearer auth & acl-delete', async () => {
    const response = await request.delete('/videogames/1').set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

  test('read all /tabletopGames - requires basic auth', async () => {
    const response = await request.get('/tabletopGames').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });

  test('read one /tabletopGames/:id - requires basic auth', async () => {
    const response = await request.get('/tabletopGames/1').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });

  test('create /tabletopGames - requires bearer auth & acl-create', async () => {
    const response = await request.post('/tabletopGames').send({
      name: 'catan',
      released: '1998',
      genre: 'fun',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

  test('update /tabletopGames/:id - requires bearer auth & acl-update', async () => {
    const response = await request.put('/tabletopGames/1').send({
      name: 'halo 2',
      released: '2004',
      genre: 'fps 2.0',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

  test('delete /tabletopGames/:id - requires bearer auth & acl-delete', async () => {
    const response = await request.delete('/tabletopGames/1').set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

});