const express = require('express');
const UserToken = require("../classes/UserToken");
const MySQLHelper = require("../classes/MySQLHelper");
const router = express.Router();
require('dotenv').config();

router.get('/', UserToken.authenticateToken, (req, res) => {
    MySQLHelper.executeQuery(req, res, 'SELECT category_code, name FROM category');
});

module.exports = router;
