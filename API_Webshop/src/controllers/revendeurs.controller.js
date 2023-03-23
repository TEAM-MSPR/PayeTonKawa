const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const API_KEY = '';
const DOMAIN = '';
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
            const data ='HELLO WORD'; /*token*/

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

            const attachment = fs.readFileSync('./src/qrcodes/qr-code.png');

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
                    console.log('QR code envoyé par e-mail :->'+error+'<- '+body.message);
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
        if(response.rows[0].count > 0 ){
            res.send('token verify');
        }
    });
}

const ReSendQR = async (req, res) => {
    const { pseudo } = req.body;
    await pool.query('SELECT mail,token from revendeur WHERE pseudo = $1', [pseudo]).then(response => {
        if(response){
           
            const mail  = response.rows[0].mail;
            const token  = response.rows[0].token;
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

           const attachment = fs.readFileSync('./src/qrcodes/qr-code.png');

            const mailOptions = {
                from: 'example@' + DOMAIN,
                to: mail,
                subject: 'QR Code',
                text: 'Voici votre QR code en pièce jointe',
                attachment: attachment
            };

            mailgun.messages().send(mailOptions, (error, body) => {
                if (error) {
                    console.log(error+'\r\n'+body);
                    res.send(response);
                } else {
                    console.log('QR code envoyé par e-mail'+'\r\n'+error+'\r\n'+body);
                    res.send('MAIL renvoyer')
                }
            });

           // 

        } else {
            res.send(response);
        }
    });
}


module.exports = {
    setRevendeur,
    verifyRevendeur,
    ReSendQR
}