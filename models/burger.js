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
        allowNull: false,
        validate: {
            //check if no name was entered in browser
            notEmpty:{
                msg: "Name can't be empty"
            }
        }
    },
    devoured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

var burger = {
    getAllBurgers: function (callback) {
        burgers.findAll().then(function (res) {
            callback(res);
        });
    },
    addBurger: function (burger_name, callback) {
        burgers.create({
            burger_name: burger_name,
        }).then(function () {
            callback();
        }).catch(function (err) {
            console.log(err.message);
            
            callback(err);
        });
    },
    devourBurger: function (id, devoured, callback) {
        burgers.update({
            devoured: devoured
        }, {
                where: { id: id }

            }).then(function () {
                callback();
            }).catch(function (err) {
                callback(err);
            });
    }
};

burgers.sync({
    logging: console.log
}).then(function () {
    console.log("syncing burger model");
}).catch(function (error) {
    throw error;
});

module.exports = burger;
