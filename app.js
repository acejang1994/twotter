var exphbs = require('express-handlebars'); 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var index = require('./routes/index');
var mongoose = require('mongoose');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI;

app.get('/', index.home);
app.get('/login', index.login);

app.post('/loginUser', index.loginUser);
app.post('/addingTwote', index.addTwote);
app.post('/removingTwote', index.removeTwote);
app.post('/logout', index.logout);

mongoose.connect('mongodb://localhost/test');
// mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});

