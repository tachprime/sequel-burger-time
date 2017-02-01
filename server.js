//jshint esversion:6
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const burgersController = require('./controllers/burgers_controller');

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use('/', burgersController);

app.listen(app.get('port'), function() {
    console.log("server ready on http://localhost:%s", app.get('port'));
});
