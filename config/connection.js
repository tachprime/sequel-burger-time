var Sequelize = require('sequelize');
var env = process.env.JAWSDB_URL ? 'production' : 'development';
var config = require('./config')[env];
var connection;

if (config.use_env_variable) {
    connection = new Sequelize(process.env[config.use_env_variable]);
} else {
    connection = new Sequelize(config.database, config.username, config.password, {
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}

connection.authenticate().then(function (err) {

    console.log('Connection has been established successfully.');

}).catch(function (err) {

    console.log('Unable to connect to the database:', err);

});

module.exports = connection;
