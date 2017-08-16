(function() {
    const app = angular.module("SWapp", [])

    app.controller('CharactersCtrl', function ($scope, $http) {
        //get characters 
        SERVER_URL = 'http://localhost:8080';
        $http({
            method : 'GET',
            url: SERVER_URL + '/api/characters'
        }).then(function successCallback(response) {
            console.log(response.data)
            $scope.characters = response.data
            console.log($scope.characters)
        }, function errorCallback(response) {
            console.log("Error:",response)
        });

        $scope.genders = ["Male", "Female"];

        $scope.addCharacter = function (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender) {
            let is_male = false;
            if(gender === 'Male') {
                is_male = true;
            }
            const character = {
                name,
                height,
                mass,
                hair_color,
                skin_color,
                eye_color,
                birth_year,
                is_male,
                favorite: false
            };

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
                $http(req).then(function successCallback(req) {
                    console.log(req.config.data.character);
                    $scope.characters.unshift(req.config.data.character);
                }, function errorCallback(res) {
                    console.log("Error:",res);
                })
        };


        $scope.toggleFav = function (character) {
            character.favorite = !character.favorite ;

            $http.put(
                "http://localhost:8080/api/characters/" + character._id,
                character
            ).then(function (res) {
            }, function (err) {
                console.log("Error:", err)
            });
                      
        }

        $scope.deleteCharacter = function(character) {
            $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/api/characters/' + character._id,
                    data: {
                        _id : character._id 
                    },
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                })
                .then(function(response) {
                }, function(rejection) {
                    console.log(rejection.data);
                });
        }

        $scope.showModal = false;

        $scope.open = function() {
            $scope.showModal = true;
        };

        $scope.ok = function (character) {  
            if(character.is_male === 'Male') {
                character.is_male = true;
            } else {
                character.is_male = false;
            }   

            console.log(character)     

            $http.put(
                "http://localhost:8080/api/characters/" + character._id,
                character
            ).then(function (res) {
                $scope.showModal = !$scope.showModal;
            }, function (err) {
                console.error("Error:", err);
            })
        }

    })
})();