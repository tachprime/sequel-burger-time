//jshint esversion:6
var Sequelize = require('sequelize');
var connection = require('../config/connection');

var burgers = connection.define('burgers', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    burger_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    devoured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

var burger = {
    getAllBurgers: function(callback) {
        burgers.findAll().then(function(res) {
            callback(res);
        });
    },
    addBurger: function(burger_name, callback) {
        burgers.create({
            burger_name: burger_name,
        }).then(function() {
            console.log("burger added");
            callback();
        });
    },
    devourBurger: function(id, devoured, callback) {
        burgers.update({
            devoured: devoured
        }, {
            where: {
                id: id
            }
        }).then(function() {
            console.log("burger eaten");
            callback();
        });
    }
};

burgers.sync({
    logging: console.log
}).then(function() {
    console.log("syncing burger model");
}).catch(function(error) {
    console.log(error);
});

module.exports = burger;
