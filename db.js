const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/characterdb', {useMongoClient: true}).then(function () {
	console.log("Mongodb connected");
}). catch(function (err) {
	console.error("Error:", err);
})

module.exports = mongoose;