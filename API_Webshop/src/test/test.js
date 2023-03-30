const request = require('supertest');
const auth = require('../index');
const app = require('../middleware/auth');

describe('Revendeurs', () => {
  let token;

  beforeAll((done) => {
    request(app)
      .post('/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password'
      })
      .end((err, response) => {
        token = response.body.token; // récupérer le token pour les requêtes authentifiées
        done();
      });
  });

  describe('POST /revendeurs', () => {
    it('devrait ajouter un revendeur', async () => {
      const response = await request(app)
        .post('/revendeurs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'John Doe',
          email: 'john.doe@example.com'
        });
      expect(response.status).toBe(201);
      expect(response.body.nom).toBe('John Doe');
      expect(response.body.email).toBe('john.doe@example.com');
    });

    it('devrait retourner une erreur 401 si non authentifié', async () => {
      const response = await request(app)
        .post('/revendeurs')
        .send({
          nom: 'John Doe',
          email: 'john.doe@example.com'
        });
      expect(response.status).toBe(401);
    });
  });

  describe('GET /revendeurs', () => {
    it('devrait retourner la liste des revendeurs', async () => {
      const response = await request(app)
        .get('/revendeurs')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('devrait retourner une erreur 401 si non authentifié', async () => {
      const response = await request(app)
        .get('/revendeurs');
      expect(response.status).toBe(401);
    });

    it('devrait retourner une erreur 404 si aucun revendeur trouvé', async () => {
        const response = await request(app)
            .get('/revendeurs')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
  });

    describe('GET /revendeurs/:id', () => {
        it('devrait retourner un revendeur', async () => {
            const response = await request(app)
                .get('/revendeurs/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.nom).toBe('John Doe');
            expect(response.body.email).toBe('john.doe@example.com');
        });
    });

    describe('PUT /revendeurs/:id', () => {
        it('devrait modifier un revendeur', async () => {
            const response = await request(app)
                .put('/revendeurs/1')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nom: 'Jane Doe',
                    email: 'john.doe@example.com'
                });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.nom).toBe('Jane Doe');
            expect(response.body.email).toBe('john.doe@example.com');
        });

        it('devrait retourner une erreur 404 si aucun revendeur trouvé', async () => {
            const response = await request(app)
                .put('/revendeurs/0')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nom: 'Jane Doe',
                    email: 'john.doe@example.com'
                });
            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /revendeurs/:id', () => {
        it('devrait supprimer un revendeur', async () => {
            const response = await request(app)
                .delete('/revendeurs/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        it('devrait retourner une erreur 404 si aucun revendeur trouvé', async () => {
            const response = await request(app)
                .delete('/revendeurs/0')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        });
    });
});
