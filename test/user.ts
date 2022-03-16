const chai = require('chai');
const request = require('supertest');
import server from '../src/app'
import { expect } from 'chai';
import { dbConnection } from "../src/db/connectionDB";
import {routesLoader} from "../src/routes/routesLoader";



const userToInsert = {
    userName: 'testUser',
    email: 'userTest@example.com',
    banned: 0,
    twoFact: 0,
    score: 0,
    privateKey: null,
    type: 'User',
    password: "test"
  }

 /*
  * Test the post /api/user route
  */

 describe('Add user test', async () => {
    it('Adds a user and login', async () => {
      await dbConnection.getInstance().createConnection();
      routesLoader(server);
      const { body, status } = await request(server).post('/api/user/create').send(userToInsert);
      expect(status).to.equal(200);
    }); 
  });
  
  describe('Login a user', async () => {
    it('Logs in the user', async () => {
    const sessRez = await request(server).post('/api/session/create').send(userToInsert);
    expect(sessRez.status).to.equal(200);  
  });
});
