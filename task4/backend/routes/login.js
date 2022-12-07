const express = require("express");
const router = express.Router();
const UserToken = require('../classes/UserToken');

router.post('/', (req, res) => {
    const params = {...req.body};
    const token = UserToken.generateAccessToken(params.user, params.password)
    if (token === null) {
        return res.status(401).json({errors: [{message: 'Nie poprawny login lub hasło.'}]});
    }
    return res.status(200).json({data: { token: token }});
});

module.exports = router;
