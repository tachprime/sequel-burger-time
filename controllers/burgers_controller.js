//jshint esversion:6
const express = require('express');
const router = express.Router();
const burger = require('../models/burger');
const bodyParser = require('body-parser');

var valid = true;
var error = "Please fill out before submitting";

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (req, res) {

    burger.getAllBurgers(function (data) {

        var hbsTmp = {
            burgers: data,
            msg: [{ valid: valid, error: error }]
        };

        res.render('index', hbsTmp);

        valid = true;

    });
});

router.post('/add', function (req, res) {

    var name = req.body.burger_name;

    burger.addBurger(name, function (err) {
        if (err) {

            valid = false;

        }

        res.redirect('/');
    });

});

router.post('/devour/:id', function (req, res) {

    var ateBurger = {
        id: req.params.id,
        devoured: req.body.devoured
    };

    burger.devourBurger(ateBurger.id, ateBurger.devoured, function (err) {
        if (err) console.log(err);

        res.redirect('/');
    });

});

router.use(function (req, res) {
    res.status(404).send('404 error');
});

router.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send('500 error');
});

module.exports = router;