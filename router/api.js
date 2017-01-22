const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt-nodejs');

router.route('/users').get((req, res) => {
    Users.find((err, doc) => {
        if (err) console.log(err);
        res.status(200).json(doc);
    })
}).post((req, res) => {
    user = req.body;
    let newUser = new Users();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    if (!user.username || !user.email) {
        res.status(403).res.json({
            "error": "Bad Data"
        })
    } else {
        newUser.save(user, (err, task) => {
            if (err) res.send(err);
            res.status(201).send({
                "successful": "user created"
            });
        })
    }
})

router.route('/users/:id').put((req, res) => {
    let user = req.body;
    let newUser = {}

    if (user.username) {
        newUser.username = user.username;
    }
    if (task.email) {
        newUser.email = user.email;
    }
    if (!newUser) {
        res.status(406).json({
            "Error": "bad data"
        })
    } else {
        Users.update({_id: req.params.id, newUser, function(err, user){
            if(err) {
                res.status(404).send(err)
            }
            res.status(202).json(user)
        }})
    }

}).delete((req, res) => {
    Users.remove({_id: req.params.id}, (err, user) => {
        if(err){
            res.status(404).send(err);
        }
        res.status(200).json({
            "message": "User Deleted"
        });
    })
})

module.exports = router;
