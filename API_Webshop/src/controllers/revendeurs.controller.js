const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'bgjtis2ivq0a1fe0ahiy-postgresql.services.clever-cloud.com',
    user: 'ubmbdses5wpeioit8co1',
    password: 'W8uDI19fylWgm1lDjQrDjLhKYhO83U',
    database: 'bgjtis2ivq0a1fe0ahiy',
    port: '5035'
})

const setRevendeur = async (req, res) => {
    const { nom, prenom, mail, id_entreprise, pseudo, telephone } = req.body;
    const token = jwt.sign({ nom: nom, prenom: prenom, id_entreprise: id_entreprise, pseudo: pseudo }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });

    await pool.query('INSERT INTO revendeur (nom, prenom, mail, id_entreprise, token, pseudo, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nom, prenom, mail, id_entreprise, token, pseudo, telephone]).then(response => {
        if (response) {
            res.send('revendeur ' + pseudo + ' cree');
        } else {
            res.send(response);
        }
    }).catch(error => {
        res.send('Erreur : ' + error);
    });
}

module.exports = {
    setRevendeur
}