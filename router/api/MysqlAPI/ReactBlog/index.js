const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0605198922071958@Chelseafc',
    database: 'react_mysql'
})

connection.connect();

router.route('/signup').post((req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    let request = {
        username,
        email,
        password
    }

    let query = connection.query("INSERT INTO users SET ?", request, (error, result) => {
        console.log(query.sql);
        if (error) {
            res.status(500).json({
                error
            })
        } else {
            res.status(201).json({
                result
            })
        }
    })
})

router.route('/signin').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username) {
        if (password) {
            let query = connection.query("SELECT * FROM users WHERE username='" + username + "'", (error, result) => {
                console.log(query.sql);
                if (error) {
                    res.status(400).json({
                        error
                    })
                } else {
                    console.log(result)
                    let resultData = result[0]
                    if (resultData) {
                        let isVerified = bcrypt.compareSync(password, resultData.password);
                        console.log(isVerified);
                        if (isVerified) {
                            let token = jwt.sign(resultData, process.env.SECRET, {
                                expiresIn: 60 * 60 * 24
                            })
                            delete resultData.password
                            res.status(200).json({
                                resultData,
                                token
                            })
                        } else {
                            res.status(404).json({
                                response: "Invalid Password"
                            })
                        }
                    } else {
                        res.status(404).json({
                            response: "Invalid User"
                        })
                    }
                }
            })
        } else {
            res.status(404).json({
                error: "Empty Password Field"
            })
        }
    } else {
        res.status(404).json({
            error: "Empty Username Field"
        })
    }
})

router.route('/blog').get((req, res) => {
    let query = connection.query('SELECT * FROM blog', (error, result) => {

        if (error) {
            res.status(404).json({
                error
            })
        } else {
            res.status(200).json({
                result
            })
        }
    })
})

router.route('/blogged/:id').get((req, res) => {
    console.log(req.params.id);
    if (req.params.id === Number) {

    }
    let query = connection.query('SELECT * FROM blog WHERE id=' + connection.escape(req.params.id), (error, result) => {
        console.log(query.sql);
        if (error) {
            res.status(400).json({
                error
            })
        } else {
            res.status(200).json({
                result
            })
        }
    })
})

router.use((req, res, next) => {
    let token = req.headers['auth-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.status(404).json({
                err,
                message: 'Invalid Token'
            })
        }
        req.id = decoded.id;
        req.username = decoded.username;
        next();
    })
})

router.route('/blog').post((req, res) => {

    let post = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.id
    }

    let query = connection.query('INSERT INTO blog SET ?', post, (error, result) => {
        console.log(query.sql);
        if (error) {
            console.error(error);
            res.status(404).json({
                error
            })
        } else {
            res.status(201).json({
                result
            })
        }
    })

}).put((req, res) => {

}).delete((req, res) => {

})

router.route('/blogged').put((req, res) => {
    if (req.id) {
        let query = connection.query("UPDATE blog SET title = ?, content = ? WHERE id= ? ", [req.body.title, req.body.content, req.body.id], (error, result) => {
            console.log(query.sql);
            if (error) {
                res.status(400).json({
                    error
                })
            } else {
                res.status(201).json({
                    result
                })
            }
        });
    }
}).delete((req, res) => {
    let query = connection.query('DELETE FROM blog WHERE id=' + req.body.id, (error, result) => {
        console.log(query.sql);
        if (error) {
            res.status(500).json({
                error
            })
        } else {
            res.status(200).json({
                result
            })
        }
    })
})

router.route('/comment').get((req, res) => {
    console.log(req.query)
    let query = connection.query("SELECT * FROM comment WHERE blog_id=" + req.query.blog, (err, result) => {
        console.log(query.sql);
        if (err) {
            res.status(404).json({
                err
            })
        } else {
            res.status(200).json({
                result
            })
        }
    })
}).post((req, res) => {
    let blog_id = req.body.blog_id;
    let query = connection.query("INSERT INTO comment SET user_id = ?, comment = ?, blog_id = ?", [req.id, req.body.comment, blog_id], (err, result) => {
        console.log(query.sql);
        if (err) {
            console.error(err)
        }
    })
    let queryTwo = connection.query("SELECT * FROM comment WHERE id=" + blog_id, (err, result) => {
        console.log(queryTwo.sql)
        if (err) {
            res.status(404).json({
                err
            })
        } else {
            res.status(201).json({
                result
            })
        }
    })
})

module.exports = router;