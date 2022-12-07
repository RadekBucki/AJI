const express = require('express');
const {ER_BAD_NULL_ERROR, ER_DUP_ENTRY} = require('mysql/lib/protocol/constants/errors');
const UserToken = require('../classes/UserToken');
const MySQLHelper = require("../classes/MySQLHelper");
const HTTPRequestValidator = require("../classes/HTTPRequestValidator");
const router = express.Router();
require('dotenv').config();

const getProduct = (req, res) => {
    const sku = req.params.sku;
    MySQLHelper.executeQuery(req, res, 'SELECT sku,product.name,description,unit_price,unit_weight,category.name as "category_name",category.category_code as category_code FROM product ' +
        'JOIN category ON category.id=product.category_id ' +
        'WHERE product.sku="' + sku + '"')
};

router.get('/:sku', getProduct);

router.get('/', (req, res) => {
    MySQLHelper.executeQuery(req, res,
        'SELECT sku,product.name,description,unit_price,unit_weight,category.category_code as category_code, category.name as "category_name" FROM product ' +
        'JOIN category ON category.id=product.category_id');
});

router.post('/', UserToken.authenticateToken, (req, res) => {
    const requiredParams = ['sku', 'name', 'description', 'unit_price', 'unit_weight', 'category_code'];
    const params = {...req.body};

    const badRequestErrors = HTTPRequestValidator.validateRequiredParams(requiredParams, params);

    if (badRequestErrors.length > 0) {
        return res.status(400).json({errors: badRequestErrors});
    }

    params.category_id = '(SELECT id FROM category WHERE category.category_code=' + params.category_code + ')';
    MySQLHelper.executeQuery(req, res, 'INSERT INTO product (sku, name, description, unit_price, unit_weight, category_id) ' +
        'VALUES (' + params.sku + ',' + params.name + ',' + params.description + ',' + params.unit_price +
        ',' + params.unit_weight + ',' + params.category_id + ')',
        (error) => {
            if (error) {
                const errorResponse = {code: 500, message: 'Internal server error'};
                if (error.errno === ER_DUP_ENTRY) {
                    errorResponse.code = 409;
                    errorResponse.message = 'Produkt o tym sku już istnieje.';
                } else if (error.errno === ER_BAD_NULL_ERROR) {
                    errorResponse.code = 400;
                    errorResponse.message = 'Podano nieprawidłową kategorię.';
                }
                return res.status(errorResponse.code).json({errors: [{message: errorResponse.message}]});
            } else {
                return res.status(201).json({data: req.body});
            }
        }
    )
});

router.put('/:sku', UserToken.authenticateToken, function (req, res) {
    const allowedParams = ['sku', 'name', 'description', 'unit_price', 'unit_weight', 'category_code'];
    const params = {...req.body};

    if (Object.values(params).length === 0) {
        return res.status(400).json({errors: [{message: 'Brak danych do zaktualizowania.'}]});
    }

    const badRequestErrors = HTTPRequestValidator.validateAllowedParams(allowedParams, params);

    if (badRequestErrors.length > 0) {
        return res.status(400).json({errors: badRequestErrors});
    }
    if ('category_code' in params) {
        params.category_id = '(SELECT id FROM category WHERE category.category_code=' + params.category_code + ')';
        delete params.category_code;
    }
    const updatedFields = Object.entries(params).map(param => param[0] + '=' + param[1]).join(', ');

    MySQLHelper.executeQuery(req, res, 'UPDATE product SET ' + updatedFields + ' WHERE sku="' + req.params.sku + '"',
        (error, results) => {
            if (error) {
                const errorResponse = {message: 'Internal server error'};
                return res.status(errorResponse.code).json({errors: [errorResponse]});
            } else if (results.changedRows === 0 && results.affectedRows === 0) {
                return res.status(404).json({errors: [{message: 'Nie odnaleziono.'}]});
            } else {
                if ('sku' in params) {
                    req.params.sku = req.body.sku;
                }
                return getProduct(req, res);
            }
        });
});

module.exports = router;
