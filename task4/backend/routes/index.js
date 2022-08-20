var mysql = require('mysql');
var express = require('express');

var router = express.Router();

const connectionData = {
    host: 'localhost',
    user: 'root',
    password: 'PvyrA6dW',
    database: 'final_application'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    var connection = mysql.createConnection(connectionData);
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
    res.render('index', {title: 'Express'});
});

router.get('/products/:sku', function (req, res, next) {
    const sku = req.params.sku;
    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('SELECT sku,product.name,description,unit_price,unit_weight FROM product ' +
        'JOIN category ON category.id=product.category_id = category.id ' +
        'WHERE product.sku="' + sku + '"',
        function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(500).json({error: {code: 500, message: "Internal server error"}});
            } else if (results.length) {
                return res.status(200).json({data: results[0]});
            } else {
                return res.status(404).json({error: {code: 404, message: "Not Found"}});
            }
        });
    connection.end();
});

router.get('/products', function (req, res, next) {
    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('SELECT sku,product.name,description,unit_price,unit_weight FROM product ' +
        'JOIN category ON category.id=product.category_id = category.id', function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({error: {code: 500, message: "Internal server error"}});
        } else {
            return res.status(200).json({data: results});
        }
    });
    connection.end();
});

// router.post('/products', function (req, res, next) {
//     const params = req.body;
//     var connection = mysql.createConnection(connectionData);
//     connection.connect();
//     connection.query('INSERT INTO product (sku, name, description, unit_price, unit_weight, category_id) ' +
//         'VALUES (' + Object.entries(params).join() +')', function (error, results, fields) {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({error: {code: 500, message: "Internal server error"}});
//         } else {
//             return res.status(201)
//         }
//     });
//     connection.end();
// });

module.exports = router;
