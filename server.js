'use strict'

const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const characters = require('./characters.json')
const fs = require('fs')
const _ = require('lodash')
const uuidv1 = require('uuid/v1')

function log(obj) {
    console.log(require('util').inspect(obj, false, null));
}

server.use(bodyParser.urlencoded())
server.use(bodyParser.json())

server.use(express.static(__dirname + '/app'));

server.get('/api/characters', function(req, res) {
    res.json(characters)
});

server.post('/api/characters', function(req, res) {
    async function updateCharacters() {
    	req.body.character.id = uuidv1()
        characters.characters.push(req.body.character)
        await fs.writeFile('characters.json', JSON.stringify(characters))
    }
    updateCharacters().catch(function(err) {
        console.log("Error:", err)
    })
})

server.delete('/api/deletecharacter/:id', function(req, res) {
	async function deleteCharacter() {
    	_.remove(characters.characters, { name: req.body.name })
        await fs.writeFile('characters.json', JSON.stringify(characters))
	}
	deleteCharacter().catch(function (err) {
		console.log("Error: ", err)
	})

})

server.put('/api/updatecharacter/:id', function(req, res) {
	async function updateCharacter() {
		_.remove(characters.characters, {id : req.body.id })
		characters.characters.push(req.body)
		await fs.writeFile('characters.json', JSON.stringify(characters))
	}
	updateCharacter().catch(function (err) {
		console.log("Error: ", err)
	})
})

server.listen(8080, function() {
    console.log("Server", process.pid, 'listening on', 8080)
});

exports = module.exports = server