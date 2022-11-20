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

function authenticateToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({errors: [{message: 'Brak tokenu.'}]});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, username, password) => {
        if (
            err ||
            username !== process.env.ADMIN_USER ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(403).json({errors: [{message: 'Brak uprawnień do operacji'}]});
        }
    })
}

module.exports = {generateAccessToken, authenticateToken};