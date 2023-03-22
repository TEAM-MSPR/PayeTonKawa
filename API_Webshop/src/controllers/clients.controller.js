const { Pool, Query } = require('pg'); //test
const pool = new Pool({
    host: 'bgjtis2ivq0a1fe0ahiy-postgresql.services.clever-cloud.com',
    user: 'ubmbdses5wpeioit8co1',
    password: 'W8uDI19fylWgm1lDjQrDjLhKYhO83U',
    database: 'bgjtis2ivq0a1fe0ahiy',
    port: '5035'
});

const setClient = async (req, res) => {
    const { id, nom, prenom, mail, pseudo, telephone } = req.body;
    const dataQrcode = 'https://www.example.com';
    qr.toDataURL(dataQrcode, (err, url) => {
        if (err) throw err;

        // Envoyer le QR code par email
        const attachment = new mailgun.Attachment({
            data: url,
            filename: 'qr-code.png'
        });
    });

    const data = {
        from: 'christopher.puaud@sandboxd933428bae0743f4b0cd16fd345b80a0.mailgun.org',
        to: 'simon.laurent@epsi.fr',
        subject: 'Hello',
        text: 'Envoi qr code',
        attachment: attachment
    };
    
    await pool.query('INSERT INTO client VALUES ($1, $2, $3, $4, $5, $6)', [id, nom, prenom, mail, pseudo, telephone]).then(response => {
        if (response) {
            res.send('client ' + nom + ' cree');
            mailgun.messages().send(data, (error, body) => {
                console.log(body);
            });
        } else {
            res.send(response);
        }
    }).catch(error => {
        res.send('Erreur : ' + error);
    });
}

module.exports = {
    setClient
}
