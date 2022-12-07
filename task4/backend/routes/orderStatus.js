const express = require('express');
const UserToken = require("../classes/UserToken");
const MySQLHelper = require("../classes/MySQLHelper");
const router = express.Router();

router.get('/', UserToken.authenticateToken, (req, res) => {
    MySQLHelper.executeQuery(req, res, 'SELECT code, name FROM order_status');
});

module.exports = router;
