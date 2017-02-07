const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host:'localhost',
    user: '',
    password: '',
    database: '',
})

router.route('/').get((req, res) => {

    // for

    res.render('p5/index', {examples}).status(200);
})