const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const API_KEY = '07c75aeee68459f7dc3b58962d4d5440-30344472-bdac222e';
const DOMAIN = 'sandbox16378b9456fc435cb1b1b3fe2e0477f4.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });
const qr = require('qrcode');
const fs = require('fs');

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
            const data = token;

            qr.toFile('./src/qrcodes/qr-code.png',
                data, {
                color: {
                    dark: '#000',  // Couleur des modules foncés
                    light: '#fff' // Couleur des modules clairs
                }
            }, function (err) {
                if (err) throw err;
                console.log('QR code généré !');
            });

            const attachment = fs.createReadStream('./src/qrcodes/qr-code.png');

            const mailOptions = {
                from: 'example@' + DOMAIN,
                to: mail,
                subject: 'QR Code',
                text: 'Voici votre QR code en pièce jointe',
                attachment: attachment
            };

            mailgun.messages().send(mailOptions, (error, body) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('QR code envoyé par e-mail');
                }
            });

        } else {
            res.send(response);
        }
    }).catch(error => {
        res.send('Erreur : ' + error);
    });
}

const verifyRevendeur = async (req, res) => {
    const { token, nom } = req.body;
    await pool.query('SELECT COUNT (*) from revendeur WHERE token = $1 AND nom = $2', [token, nom]).then(response => {
        if(response.rowCount > 0 ){
            res.send('token verify');
        }
    });
}

module.exports = {
    setRevendeur,
    verifyRevendeur
}