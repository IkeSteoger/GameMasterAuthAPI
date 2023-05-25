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
    password: 'admin',
    role: 'admin',
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
      role: 'admin',
    });

    expect(response.status).toEqual(201);
  });

  test('allow for signin', async () => {
    const response = await request.post('/signin').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });


});