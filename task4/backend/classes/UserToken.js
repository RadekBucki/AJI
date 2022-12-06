require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(username, password) {
    if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
        return null;
    }
    return jwt.sign(
        {
            username: username,
            password: password
        },
        process.env.TOKEN_SECRET
    );
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.replace('Bearer ','');
    if (token == null) return res.status(401).json({errors: [{message: 'Brak tokenu.'}]});

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (e) {
        return res.status(403).json({errors: [{message: 'Brak uprawnień do operacji'}]});
    }
}

module.exports = {generateAccessToken, authenticateToken};
