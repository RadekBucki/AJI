const express = require('express');
const MySQLHelper = require("../classes/MySQLHelper");
const router = express.Router();

router.get('/', (req, res) => {
    MySQLHelper.executeQuery(req, res, 'SELECT category_code, name FROM category');
});

module.exports = router;
