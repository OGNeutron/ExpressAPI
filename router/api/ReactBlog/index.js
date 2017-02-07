const express = require('express');
const router = express.Router();
const User = require('../../../models/users');
const Post = require('../../../models/Post');
const jwt = require('jsonwebtoken');

router.route('/blog').get((req, res) => {
    Post.find({}).then(result => {
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(404).json({
            err
        })
    }) 
})

router.route('/:id').get((req, res) => {
    Post.findOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(404).json({
            err
        })
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
        req._id = decoded.id;
        req.uername = decoded.username;
        next()
    })
})

router.route('/add').post((req, res) => {
    let post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(response => {
        res.status(201).json({
            response
        })
    }).catch(err => {
        res.status(404).json({
            err
        })
    })
})

router.route('/update').put((req, res) => {
    let id = req.body.id;
    let update = {
        title: req.body.title,
        content: req.body.content
    }
    console.log(update);
    Post.findByIdAndUpdate({_id: id}, update).then(result => {
        console.log(result);
        res.status(201).json({
            result
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
})

router.route('/delete/:id').delete((req, res) => {

    Post.findByIdAndRemove({_id: req.params.id}).then(result => {
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
    
})

module.exports = router;