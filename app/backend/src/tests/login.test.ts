import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/User';
import Jwt from '../utils/jwt';
import HandlePassword from '../utils/bcrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('When POST/login', async () => {
  describe('is sucessfull', () => {

    const loginMock: ILogin = {
      email: "admin@admin.com",
      password: "secret_admin" 
    }

    afterEach(() => { sinon.restore() })

    it('should return a token', async () => {
      sinon.stub(UserModel, 'findOne').resolves(loginMock as UserModel)
      sinon.stub(HandlePassword, 'checkPassword');
      sinon.stub(Jwt, 'createToken').returns('token');

      const response = await chai.request(app).post('/login').send(loginMock)
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({token: 'token'})
    });
  }),

  describe('is not sucessfull', () => {

    const loginMock: ILogin = {
      email: "admin@admin.com",
      password: "secret_admin" 
    }

    afterEach(() => { sinon.restore() })

    it('email should be required', async () => {
      const response = await chai.request(app).post('/login').send({ email: '', password: 'secret_admin'})
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({message: 'All fields must be filled'})
    });

    it('password should be required', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: ''})
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({message: 'All fields must be filled'})
    });

    it('the user must be found/registered in DB', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null)

      const response = await chai.request(app).post('/login').send(loginMock as UserModel)
      
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({message: 'Incorrect email or password'})
    });
  })
});

// describe('When GET/login/validate', () => {
//   describe('is sucessfull', () => {

//     const loginMock: ILogin = {
//       email: "admin@admin.com",
//       password: "secret_admin" 
//     }

//     const tokenMock: string = 'wdjkvcnTdggs46sfdgAMyggfdiasubfTYASghgjdn50nfioks8dnsygehsT';

//     afterEach(() => { sinon.restore() })

//     it('should return the proper role', async () => {
//       sinon.stub(UserModel, 'findOne').resolves(loginMock as UserModel)
//       sinon.stub(HandlePassword, 'checkPassword');
//       sinon.stub(Jwt, 'createToken').returns('token');

//       const response = await chai.request(app).get('/login/validate').set('authorization', tokenMock).send();
      
//       expect(response.status).to.be.equal(200);
//       expect(response.body).to.be.deep.equal({role: 'admin'})
//     });
//   })
// })
