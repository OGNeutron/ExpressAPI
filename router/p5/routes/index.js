const express = require('express');
const router = express.Router();
const Sketch = require('../../../models/p5');
const path = require('path');

router.use('p5/sketch/', express.static(path.join(__dirname, 'public')))

router.route('/sketch').get((req, res) => {
    Sketch.find({}).then(response => {
        res.status(200).render('p5/index', {examples: response});
    }).catch(err => {
        res.status(404).json({
            err
        })
    })
})

router.route('/new').get((req, res) => {
    res.status(200).render('p5/new');
}).post((req, res) => {
    let sketch = new Sketch({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url
    })
    sketch.save().then(response => {
        res.redirect('/p5/sketch')
    }).catch(err => {
        res.status(404).json({
            err
        })
    })
})

router.route('/sketch/:id').get((req, res) => {
    Sketch.findById({_id: req.params.id}).then(response => {
        console.log(response);
        res.render('p5/show', {example: response});
    }).catch(err => {
        console.error(err);
    })
})

module.exports = router;