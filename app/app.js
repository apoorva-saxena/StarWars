(function() {
    const app = angular.module("SWapp", [])

    app.controller('CharactersCtrl', function ($scope, $http) {
        //get characters 
        $http({
            method : 'GET',
            url: 'http://localhost:8080/api/characters'
        }).then(function successCallback(response) {
            $scope.characters = response.data.characters
            console.log($scope.characters)
        }, function errorCallback(response) {
            console.log("Error:",response)
        });

        $scope.addCharacter = function (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender) {
            let is_male = false 
            if(gender === 'male') {
                is_male = true
            }
            const character = {
                name,
                height,
                mass,
                hair_color,
                skin_color,
                eye_color,
                birth_year,
                is_male
            }

            const req = {
                    method: 'POST',
                    url: "http://localhost:8080/api/characters",
                    headers: {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    },
                    data: {
                        character
                    }
                }

                console.log(req)

                $http(req).then(function successCallback(req) {
                    console.log(req)
                    $scope.characters.unshift(req.config.data)
                }, function errorCallback(res) {
                    console.log("Error:",res)
                })
        };


        $scope.toggleFav = function (character) {
            console.log(character)
            console.log(character.id)
            character.favorite = !character.favorite 
            const updated_character = {
                name: character.name,
                height: character.height,
                mass: character.mass,
                hair_color: character.hair_color, 
                eye_color: character.eye_color,
                birth_year: character.birth_year,
                id: character.id,
                is_male: character.is_male,
                favorite: character.favorite
            }

            $http.put("http://localhost:8080/api/updatecharacter/"+character.id ,updated_character).then(function (res) {
                console.log(res)
            }, function (err) {
                console.log("Error:", err)
            })
                      
        }

        $scope.deleteCharacter = function(character) {
            console.log(character)
            $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/api/deletecharacter/' + character.id,
                    data: {
                        name : character.name 
                    },
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                })
                .then(function(response) {
                    console.log(response.data)
                }, function(rejection) {
                    console.log(rejection.data);
                });
        }

        $scope.showModal = false;

        $scope.open = function() {
            $scope.showModal = true;
        };

        $scope.ok = function (name, height, mass, hair_color, eye_color, birth_year, id) {
            console.log(name, height, mass, hair_color, eye_color, birth_year, id)
            const updated_character = {
                name,
                height,
                mass,
                hair_color, 
                eye_color,
                birth_year,
                id
            }

            $http.put("http://localhost:8080/api/updatecharacter/"+id ,updated_character).then(function (res) {
                console.log(res)
            }, function (err) {
                console.log("Error:", err)
            })
        }

    })
})();