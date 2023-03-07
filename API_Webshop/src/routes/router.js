const { Router } = require('express');
const router = Router();

const { getTest, setClients } = require('../controllers/clients.controller');

router.get('/test', getTest);
router.post('/clients', setClients)
module.exports = router;