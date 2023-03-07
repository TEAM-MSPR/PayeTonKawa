const { Router } = require('express');
const router = Router();

const { setClients } = require('../controllers/clients.controller');

router.post('/clients', setClients)
module.exports = router;