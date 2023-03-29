const { test } = require('picomatch');
const request = require('supertest');
const app = require('../index');


describe('POST /revendeurs', function() {
    it('responds with the created user', function(done) {
      const userData = {
        nom: 'Doe',
        prenom: 'John',
        mail: 'john.doe@example.com',
        pseudo: 'john.doe',
        telephone: '+1-555-555-5555',
        id_entreprise: "b0004b72-be52-11ed-a44d-cecd02b63a45"
      };

      request(app)
      .post('/revendeurs')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.equal(userData.name);
        expect(res.body.email).to.equal(userData.email);
        done();
      });
  });

/*

describe('POST /revendeurs', () => {
  it('should create a new client', async () => {
    const res = await request(app)
      .post('/revendeurs')
      .send({
        nom: 'Doe',
        prenom: 'John',
        mail: 'john.doe@example.com',
        pseudo: 'john.doe',
        telephone: '+1-555-555-5555',
        id_entreprise: "b0004b72-be52-11ed-a44d-cecd02b63a45"
      })
      .expect('Content-Type', /json/)
      .expect(200, { message: 'revendeur john.doe cree' }, done);
  });

  it('should return an error if missing required fields', async () => {
    const res = await request(app).post('/revendeurs').send({
      nom: 'Doe',
      prenom: 'John',
      mail: 'john.doe@example.com',
      telephone: '+1-555-555-5555'
    })
    
    .expect(200, { message: 'revendeur john.doe cree' }, done);
  });*/
});