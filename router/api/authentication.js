const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

//SIGN UP
router.route('/sign_up').get((req, res) => {
    Users.find((err, doc) => {
        if (err) console.log(err);
        res.status(200).json(doc);
    })
}).post((req, res) => {
    console.log(req.body)
    let newUser = new Users();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    if (!req.body.username || !req.body.email) {
        res.status(403).json({
            "error": "Bad Data"
        })
    } else {
        newUser.save(newUser, (err, task) => {
            if (err) res.send(err);
            res.status(201).json({
                "successful": "user created"
            });
        })
    }
})

//SIGN IN
router.route('/sign_in').post((req, res) => {
    console.log(req.body);
    if (req.body.username || req.body.email) {
        Users.find({ $or: [{ 'username': req.body.username }, { 'email': req.body.email }] }, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                if (req.body.password != undefined) {
                    let isVarified = bcrypt.compareSync(req.body.password, result[0].password);
                    if (isVarified) {
                        console.log(result._id)
                        let response = {
                            id: result[0]._id,
                            email: result[0].email,
                            username: result[0].username
                        }
                        let token = jwt.sign(response, process.env.SECRET, {
                            expiresIn: 60 * 60 * 24
                        });
                        res.status(200).json({
                            response,
                            token
                        });
                    } else {
                        console.log('bob')
                        res.status(200).json({
                            response: 'Invalid Password'
                        })
                    }
                }
            }
        })
    } else {
        res.status(404).json({
            response: "Please enter something"
        })
    }
});

router.use((req, res, next) => {
    let token = req.headers['auth-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.status(404).json({
                err,
                message: 'Invalid Token'
            })
        }
        req._id = decoded.id;
        req.uername = decoded.username;
        next()
    })
})

//EDIT USER
router.route('/users/:id').put((req, res) => {
    let user = req.body;
    let newUser = {}

    if (user.username) {
        newUser.username = user.username;
    }
    if (user.email) {
        newUser.email = user.email;
    }
    if (!newUser) {
        res.status(406).json({
            "Error": "bad data"
        })
    } else {
        Users.update({_id: req._id}, newUser, (err, response) => {
            if(err){
                res.status(404).json(err)
            } else {
                res.status(201).json(response);
            }
        })
    }
}).delete((req, res) => {
    Users.remove({ _id: req.params.id }, (err, user) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).json({
            "message": "User Deleted"
        });
    })
})

module.exports = router;
