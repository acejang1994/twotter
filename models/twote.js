var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
	author: String,
	authorId: String,
	message: String,
	postTime: String
});

module.exports = mongoose.model('twote', twoteSchema);
