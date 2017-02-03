//jshint esversion:6
const express = require('express');
const router = express.Router();
const burger = require('../models/burger');
const bodyParser = require('body-parser');

var valid = true;
var error = "Please fill out before submitting";

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', function (req, res) {
    burger.getAllBurgers(function (data) {
        //console.log(data[0].dataValues);
        res.render('index', {
            burgers: data,
            msg: [{valid: valid, error: error}]
        });
        valid = true;
        console.log(valid);
        
    });
});

router.post('/add', function (req, res) {
    var name = req.body.burger_name;
    valid = true;

    burger.addBurger(name, function (err) {
        if (err) {
            //console.log(err);
            
            valid = false;
        }  
        console.log(valid);
        
        res.redirect('/');
    });

});

router.post('/devour/:id', function (req, res) {

    var ateBurger = {
        id: req.params.id,
        devoured: req.body.devoured
    };

    burger.devourBurger(ateBurger.id, ateBurger.devoured, function (err) {
        console.log(err);
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
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
s = router;
