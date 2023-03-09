const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');
const { setRevendeur } = require('../controllers/revendeurs.controller');

router.post('/revendeurs', auth, setRevendeur)
module.exports = router;