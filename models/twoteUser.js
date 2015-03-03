var mongoose = require('mongoose');

var twoteUserSchema = mongoose.Schema({
	oauthID: String,
	userName: String
});

module.exports = mongoose.model('twoteUser', twoteUserSchema);
