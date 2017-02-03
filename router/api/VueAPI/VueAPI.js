const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
});

router.route('/blog').get((req, res) => {
    
    connection.connect();

    connection.query('', (error, result, fields) => {
        if(err) {
            res.status(400).json(err);
        }
    })
    
})

module.exports = router;