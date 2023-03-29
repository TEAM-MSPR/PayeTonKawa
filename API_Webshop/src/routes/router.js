const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');
const { setRevendeur, verifyRevendeur ,ReSendQR} = require('../controllers/revendeurs.controller');

router.post('/revendeurs', auth, setRevendeur);
router.post('/revendeurs/ReSendQR', ReSendQR);
router.get('/revendeurs', verifyRevendeur);
module.exports = router;