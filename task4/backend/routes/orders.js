const express = require('express');
const {ER_BAD_NULL_ERROR, ER_DUP_ENTRY} = require('mysql/lib/protocol/constants/errors');
const UserToken = require("../classes/UserToken");
const HTTPRequestValidator = require("../classes/HTTPRequestValidator");
const MySQLHelper = require("../classes/MySQLHelper");
const router = express.Router();
require('dotenv').config();

router.get('/', UserToken.authenticateToken, function (req, res) {
    MySQLHelper.executeQuery(req, res, 'SELECT oi2.*, order_status.code as status_code, order_status.name as status_name, (\n' +
        '    SELECT JSON_ARRAYAGG(JSON_OBJECT(\'sku\', p.sku, \'name\', p.name, \'price\', p.unit_price, \'quantity\', oi.quantity))\n' +
        '    FROM order_items oi\n' +
        '             JOIN product p on p.id = oi.product_id\n' +
        '    WHERE order_id=oi2.id\n' +
        ') AS products\n' +
        'FROM order_entity oi2 ' +
        'JOIN order_status ON oi2.order_status_id=order_status.id',
        (error, results) => {
            if (error) {
                return res.status(500).json({errors: [{message: 'Internal server error'}]});
            } else if (results.length) {
                results.forEach(
                    (record) => {
                        record.products = JSON.parse(record.products)
                    }
                )
                return res.status(200).json({data: results});
            } else {
                return res.status(404).json({errors: [{message: 'Nie odnalaziono.'}]});
            }
        });
});

router.post('/', function (req, res) {
    const requiredParams = ['products', 'buyer'];
    const params = {...req.body};

    const badRequestErrors = HTTPRequestValidator.validateRequiredParams(requiredParams, params);

    if (params.products.length < 1) {
        badRequestErrors.push({message: 'Nie można złożyć zamówienia bez produktów.'});
    }

    if (!params.buyer.username) {
        badRequestErrors.push({message: 'Brakująca nazwa użytkownika'});
    }

    if (!params.buyer.email) {
        badRequestErrors.push({message: 'Brakujący email'});
    }

    if (!params.buyer.phone) {
        badRequestErrors.push({message: 'Brakujący numer telefonu'});
    }

    if ((params.buyer.email.match(/@/g) || []).length !== 1) {
        badRequestErrors.push({message: 'Email musi zawierać dokładnie 1 znak @.'});
    }

    if ((params.buyer.email.match(/./g) || []).length < 1) {
        badRequestErrors.push({message: 'Email musi zawierać znak `.`.'});
    }

    if (badRequestErrors.length > 0) {
        return res.status(400).json({errors: badRequestErrors});
    }

    MySQLHelper.executeQueries(req, res, 'INSERT INTO order_entity (user_name, email, phone, order_status_id)\n' +
        '    VALUES ("' + params.buyer.username + '", "' + params.buyer.email + '", "' + params.buyer.phone + '", ' +
        '   (SELECT id FROM order_status WHERE code = "not_approved"))',
        (error) => {
            if (error) {
                const errorResponse = {code: 500, message: 'Internal server error'};
                if (error.errno === ER_DUP_ENTRY) {
                    errorResponse.code = 409;
                    errorResponse.message = 'Takie zamówienie już zostało złożone.';
                } else if (error.errno === ER_BAD_NULL_ERROR) {
                    errorResponse.code = 400;
                    errorResponse.message = 'Podano nieprawidłowe dane.';
                }
                return res.status(errorResponse.code).json({errors: [{message: errorResponse.message}]});
            }
        }
    ).then((results) => {
        params.products.forEach((product) => {
            MySQLHelper.executeQueries(res, res, 'INSERT INTO order_items(order_id, product_id, quantity) VALUES (' + results.insertId +
                ', (SELECT id FROM product WHERE sku="' + product.sku + '"), ' + product.quantity + ');',
                (error) => {
                    if (error) {
                        const errorResponse = {code: 500, message: 'Internal server error'};
                        if (error.errno === ER_BAD_NULL_ERROR) {
                            errorResponse.code = 400;
                            errorResponse.message = 'Nie istnieje produkt o podanym sku.';
                        }
                        return res.status(errorResponse.code).json({errors: [{message: errorResponse.message}]});
                    }
                });
        });
        return res.status(201).json({data: req.body});
    });
});

router.put('/:orderId/:statusCode', UserToken.authenticateToken, function (req, res) {
    MySQLHelper.executeQuery(req, res, 'UPDATE order_entity ' +
        'SET order_status_id=(SELECT id FROM order_status WHERE code="' + req.params.statusCode + '")' +
        'WHERE id=' + req.params.orderId,
        (error, results) => {
            if (error) {
                if (error?.sqlMessage === 'Impossible transition between statuses.') {
                    return res.status(400).json({errors: [{message: 'Nie dozwolone przejście między statusami.'}]});
                }
                const errorResponse = {code: 500, message: 'Internal server error'};
                if (error.errno === ER_BAD_NULL_ERROR) {
                    errorResponse.code = 400;
                    errorResponse.message = 'Nie istnieje status o podanym kodzie.';
                }
                return res.status(errorResponse.code).json({errors: [errorResponse]});
            } else if (results.changedRows === 0) {
                return res.status(404).json({errors: [{message: 'Nie odnaleziono.'}]});
            } else {
                return res.status(200).json({data: req.body});
            }
        }
    );
});

router.get('/status/:statusCode', UserToken.authenticateToken, function (req, res) {
    MySQLHelper.executeQuery(req, res, 'SELECT oi2.*, order_status.code as status_code, order_status.name as status_name, (\n' +
        '    SELECT JSON_ARRAYAGG(JSON_OBJECT(\'sku\', p.sku, \'name\', p.name, \'price\', p.unit_price, \'quantity\', oi.quantity))\n' +
        '    FROM order_items oi\n' +
        '             JOIN product p on p.id = oi.product_id\n' +
        '    WHERE order_id=oi2.id\n' +
        ') AS products\n' +
        'FROM order_entity oi2 ' +
        'JOIN order_status ON oi2.order_status_id=order_status.id ' +
        'WHERE oi2.order_status_id=(SELECT id FROM order_status WHERE code="' + req.params.statusCode + '")',
        (error, results) => {
            if (error) {
                return res.status(500).json({errors: [{message: 'Internal server error'}]});
            } else if (results.length) {
                results.forEach(
                    (record) => {
                        record.products = JSON.parse(record.products)
                    }
                )
                return res.status(200).json({data: results});
            } else {
                return res.status(404).json({errors: [{message: 'Nie odnalaziono.'}]});
            }
        }
    )
});

module.exports = router;
