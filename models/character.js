var db = require("../db");

var Character = db.model('Character', {
	name : {type: String},
	height : {type: String},
	mass : {type: String},
	hair_color : {type: String},
	skin_color : {type: String},
	eye_color : {type: String},
	birth_year : {type: String},
	is_male : {type: Boolean},
	favorite: {type: Boolean},
	date: {type: Date, required: true, default: Date.now}
});

module.exports = Character;