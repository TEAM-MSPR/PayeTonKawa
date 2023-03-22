const { Router } = require('express');
const router = Router();

const { setClient } = require('../controllers/clients.controller');

router.post('/clients', setClient)
module.exports = router;