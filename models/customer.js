var Sequelize = require('sequelize');
var connection = require('../config/connection');

var customer = connection.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            //check if no name was entered in browser
            nameCheck: function (name) {
                if (name === "") {
                    throw new Error("the name can not be empty");
                }
            }
        }
    }
    }, {
        freezeTableName: true
    });
    
customer.sync().then(function() {
    console.log("syncing customer");
}).catch(function(err) {
    throw err;
});
    
 module.exports = customer;