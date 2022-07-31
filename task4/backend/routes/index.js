var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'final_application'
});

/* GET home page. */
router.get('/', function (req, res, next) {
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });

    connection.end();
    res.render('index', {title: 'Express'});
});

module.exports = router;
