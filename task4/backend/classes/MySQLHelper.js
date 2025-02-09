var mysql = require('mysql');
require('dotenv').config();

const connectionData = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

function executeQuery(req, res, query, errorFunction = (error, results) => {
    if (error) {
        return res.status(500).json({errors: [{message: 'Internal server error'}]});
    } else if (results.length) {
        return res.status(200).json({data: results});
    } else {
        return res.status(404).json({errors: [{message: 'Nie odnalaziono.'}]});
    }
}) {
    const connection = mysql.createConnection(connectionData);
    connection.connect();
    connection.query(query, errorFunction);
    connection.end();
}

function executeQueries(req, res, query, errorFunction) {
    return new Promise(((resolve, reject) => {
        const connection = mysql.createConnection(connectionData);
        connection.connect();
        connection.query(query, (error, results) => {
            let errors = errorFunction(error);
            if (errors) {
                reject(errors);
            } else {
                resolve(results);
            }
        });
        connection.end();
    }));
}

module.exports = {executeQuery, executeQueries}
