'use strict'

const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const characters = require('./characters.json');
const fs = require('fs');
const Character = require('./models/character');
const port =  process.env.PORT || 8080;

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.use(express.static(__dirname + '/app'));

server.get('/api/characters', function(req, res) {
	Character.find(function(err, characters) {
        if (err) {
            console.error("Error: ", err);
        }
        res.json(characters);
    })
});

server.post('/api/characters', function(req, res) {
	const character = new Character(req.body.character);
	character.save(function (err, character) {
		if(err) {
			console.error("Error: ", err);
		}
        res.json(201, character);
	})
})

function characterExists(characters, id) {
	return _.find(characters, { id: id });
}

server.delete('/api/deletecharacter/:id', function(req, res) {
	Character.remove({ _id: req.body.id }, function(err, res) {
        if (err) {
            console.error("Error: ", err);
        }
        console.log(req.body.id + " deleted from database");
    })

})

server.put('/api/updatecharacter/:id', function(req, res) {
	Character.replaceOne({ _id: req.body.id }, req.body, function(err, doc) {
        if (err) {
            console.error("Error: ", err);
        }
        console.log("Doc: ", doc);
    })
})

server.listen(port, function() {
    console.log("Server", process.pid, 'listening on', 8080);
});

exports = module.exports = server;