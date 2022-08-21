var mysql = require('mysql');
var express = require('express');
const {ER_BAD_NULL_ERROR, ER_DUP_ENTRY} = require("mysql/lib/protocol/constants/errors");

var router = express.Router();

const connectionData = {
    host: 'localhost',
    user: 'root',
    password: 'PvyrA6dW',
    database: 'final_application'
};

/* GET home page. */
router.get('/', function (req, res) {
    var connection = mysql.createConnection(connectionData);
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
    res.render('index', {title: 'Express'});
});

const getProduct = function (req, res) {
    const sku = req.params.sku;
    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('SELECT sku,product.name,description,unit_price,unit_weight,category.name as "category_name" FROM product ' +
        'JOIN category ON category.id=product.category_id = category.id ' +
        'WHERE product.sku="' + sku + '"',
        function (error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({error: {code: 500, message: "Internal server error"}});
            } else if (results.length) {
                return res.status(200).json({data: results[0]});
            } else {
                return res.status(404).json({error: {code: 404, message: "Nie odnalaziono."}});
            }
        });
    connection.end();
};
router.get('/products/:sku', getProduct);

router.get('/products', function (req, res) {
    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('SELECT sku,product.name,description,unit_price,unit_weight,category.name as "category_name" FROM product ' +
        'JOIN category ON category.id=product.category_id = category.id',
        function (error, results) {
        if (error) {
            console.log(error);
            return res.status(500).json({error: {code: 500, message: "Internal server error"}});
        } else {
            return res.status(200).json({data: results});
        }
    });
    connection.end();
});

router.post('/products', function (req, res) {
    const requiredParams = ['sku', 'name', 'description', 'unit_price', 'unit_weight', 'category_code'];
    const params = {...req.body};

    const missedParams = requiredParams.filter(param => !params.includes(param));
    if (missedParams.length > 0) {
        return res.status(400).json({error: {code: 400, message: "Pominięto parametry: ", parameters: missedParams}});
    }

    const redundantParams = Object.keys(params).filter(param => !requiredParams.includes(param));
    if (redundantParams.length > 0) {
        return res.status(400).json({error: {code: 400, message: "Nadmiarowe parametry: ", parameters: redundantParams}});
    }

    Object.entries(params).forEach(function (param) {
        if (typeof param[1] == 'string') {
            params[param[0]] = '"' + param[1] + '"';
        }
    })
    params.category_id = '(SELECT id FROM category WHERE category.category_code=' + params.category_code + ')';
    delete params.category_code;

    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('INSERT INTO product (sku, name, description, unit_price, unit_weight, category_id) ' +
        'VALUES (' + Object.values(params).join() + ')',
        function (error) {
        if (error) {
            console.log(error);
            const errorResponse = {code: 500, message: 'Internal server error'};
            if (error.errno === ER_DUP_ENTRY) {
                errorResponse.code = 409;
                errorResponse.message = 'Produkt o tym sku już isnieje.';
            } else if (error.errno === ER_BAD_NULL_ERROR) {
                errorResponse.code = 400;
                errorResponse.message = 'Podano nieprawidłową kategorię.';
            }
            return res.status(errorResponse.code).json({error: errorResponse});
        } else {
            return res.status(201).json({data: req.body});
        }
    });
    connection.end();
});

router.put('/products/:sku', function (req, res) {
    const allowedParams = ['sku', 'name', 'description', 'unit_price', 'unit_weight', 'category_code'];
    const params = {...req.body};

    const unallowedParams = Object.keys(params).filter(param => !allowedParams.includes(param));
    if (unallowedParams.length > 0) {
        return res.status(400).json({error: {code: 400, message: "Niedozwolone parametry: ", parameters: unallowedParams}});
    }

    Object.entries(params).forEach(function (param) {
        if (typeof param[1] == 'string') {
            params[param[0]] = '"' + param[1] + '"';
        }
    });
    if ('category_id' in params) {
        params.category_id = '(SELECT id FROM category WHERE category.category_code=' + params.category_code + ')';
        delete params.category_code;
    }
    const updatedFields = Object.entries(params).map(param => param[0] + '=' + param[1]).join(' ');

    var connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query('UPDATE product SET ' + updatedFields + ' WHERE sku="' + req.params.sku + '"',
        function (error, results) {
        if (error) {
            console.log(error);
            const errorResponse = {code: 500, message: 'Internal server error'};
            return res.status(errorResponse.code).json({error: errorResponse});
        } else {
            if ('sku' in params) {
                req.params.sku = req.body.sku;
            }
            return getProduct(req, res);
        }
    });
    connection.end();
});

module.exports = router;
