const express = require("express");
require('dotenv').config();
const router = express.Router();
const UserToken = require('../classes/UserToken');

router.post('/', function (req, res) {
    const params = {...req.body};
    const token = UserToken.generateAccessToken(params.user, params.password)
    if (token === null) {
        return res.status(401).json({errors: [{message: 'Nie poprawny login lub hasło.'}]});
    } else {
        return res.status(200).json({data: { token: token }});
    }
});

module.exports = router;
