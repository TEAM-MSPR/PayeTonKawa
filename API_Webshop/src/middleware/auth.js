const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req);
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const pseudo = decodedToken.pseudo;
        req.auth = {
            pseudo: pseudo
        };
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error });
    }
};