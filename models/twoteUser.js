var mongoose = require('mongoose');

var twoteUserSchema = mongoose.Schema({
	userName: String
});

module.exports = mongoose.model('twoteUser', twoteUserSchema);
