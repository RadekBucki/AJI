var mysql = require('mysql');
var express = require('express');
const {ER_BAD_NULL_ERROR, ER_DUP_ENTRY} = require('mysql/lib/protocol/constants/errors');

var router = express.Router();

const connectionData = {
    host: 'localhost',
    user: 'root',
    password: 'PvyrA6dW',
    database: 'final_application'
};
router.get('/', function (req, res) {
    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('SELECT code, name FROM order_status',
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
