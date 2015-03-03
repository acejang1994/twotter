var exphbs = require('express-handlebars'); 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var index = require('./routes/index');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var fbAuth = require('./authentication.js');
var passport = require('passport');

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

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

app.use(passport.initialize());
app.use(passport.session());


var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || 'mongodb://localhost/test';
mongoose.connect(mongoURI);

app.get('/', index.login);
app.get('/login', index.login);
// app.get('/home', index.home)x;

app.get('/auth/facebook', passport.authenticate('facebook'), function(req,res){
    res.send('auth');
});

app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function(req,res){
    res.redirect('/home')
});

app.get('/home', ensureAuthenticated, index.home);

app.get('/logout', function(req, res){
	req.logout();
	console.log("logging out");
	res.redirect('/');
		console.log("redirect");	
	
});


app.post('/loginUser', index.loginUser);
app.post('/addingTwote', index.addTwote);
app.post('/removingTwote', index.removeTwote);
// app.post('/logout', index.logout);

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});