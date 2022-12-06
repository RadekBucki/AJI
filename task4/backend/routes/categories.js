var mysql = require('mysql');
var express = require('express');
const {ER_BAD_NULL_ERROR, ER_DUP_ENTRY} = require('mysql/lib/protocol/constants/errors');
const UserToken = require("../classes/UserToken");
require('dotenv').config();

var router = express.Router();

const connectionData = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};
router.get('/', function (req, res) {
    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('SELECT category_code, name FROM category',
        function (error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({errors: [{message: 'Internal server error'}]});
            } else {
                return res.status(200).json({data: results});
            }
        });
    connection.end();
});

module.exports = router;
