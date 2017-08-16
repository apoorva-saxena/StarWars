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
        res.send(characters);
    })
});

server.post('/api/characters', function(req, res) {
	const character = new Character(req.body.character);
	character.save(function (err, character) {
		if(err) {
			console.error("Error: ", err);
            res.sendStatus(500);
		}
        res.send(200, character);
	})
})

server.delete('/api/characters/:id', function(req, res) {
	Character.remove({ _id: req.body._id }, function(err, db_response) {
        if (err) {
            console.error("Error: ", err);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})

server.put('/api/characters/:id', function(req, res) {
	Character.replaceOne({ _id: req.body._id }, req.body, function(err, doc) {
        if (err) {
            console.error("Error: ", err);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})

server.listen(port, function() {
    console.log("Server", process.pid, 'listening on', 8080);
});

exports = module.exports = server;