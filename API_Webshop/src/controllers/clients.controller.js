const { Pool, Query } = require('pg');

const pool = new Pool({
    host: 'bgjtis2ivq0a1fe0ahiy-postgresql.services.clever-cloud.com',
    user: 'ubmbdses5wpeioit8co1',
    password: 'W8uDI19fylWgm1lDjQrDjLhKYhO83U',
    database: 'bgjtis2ivq0a1fe0ahiy',
    port: '5035'
})

const setClients = async (req, res) => {
    const { id, nom, prenom, mail, pseudo, telephone } = req.body;
    await pool.query('INSERT INTO client VALUES ($1, $2, $3, $4, $5, $6)', [id, nom, prenom, mail, pseudo, telephone]).then(response => {
        if (response) {
            res.send('client ' + id + ' cree');
        } else {
            res.send(response);
        }
    }).catch(error => {
        res.send('Erreur : ' + error);
    });

}

module.exports = {
    setClients
}