require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(username, password) {
    if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
        return null;
    }
    return jwt.sign(username, process.env.TOKEN_SECRET, {
        user: username,
        password: password
    });
}

function authenticateToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({errors: [{message: 'Brak tokenu.'}]});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user, password) => {
        if (
            err ||
            user !== process.env.ADMIN_USER ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(403).json({errors: [{message: 'Brak uprawnień do operacji'}]});
        }
    })
}

module.exports = {generateAccessToken, authenticateToken};