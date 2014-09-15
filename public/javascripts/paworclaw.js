/**
 * Created by acole9 on 9/15/14.
 */
/**
 * Created by elanastroud on 9/13/14.
 */
console.log("outside ang");
(function () {

    var app = angular.module("paworclaw", ['ngAnimate']);


    app.directive('httpPrefix', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                function ensureHttpPrefix(value) {
                    // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                    if(value && !/^(http):\/\//i.test(value)
                        && 'http://'.indexOf(value) === -1) {
                        controller.$setViewValue('http://' + value);
                        controller.$render();
                        return 'http://' + value;
                    }
                    else
                        return value;
                }
                controller.$formatters.push(ensureHttpPrefix);
                controller.$parsers.push(ensureHttpPrefix);
            }
        };
    });

    app.controller('controller', ['$window', '$scope', '$http', '$timeout', function ($window, $scope, $http, $timeout) {
        $scope.justOpened = true;
        $scope.showAddPet = false;

        this.loadPets = function () {
            $http.get('/users').success(function(docs) {
                $scope.pets = docs;
                console.log(JSON.stringify(docs));
                //$scope.currPet = docs[0].pets[0];
            }).error(function () {
                console.log('fail');
            });
        };

        $scope.updatePet = function (pet) {
            $http.post('/users/update',pet).success(function () {
                console.log('user posting');
            }).error(function () {
                console.log('failed to post');
            });
        };

        this.loadPets();

        $scope.index = 0;
        $scope.currPet = user1;

        this.getPercantage = function(pet) {
            var score = pet.upvotes/(pet.upvotes+pet.downvotes);
            return Math.round(score * 100);
        };

        this.getHashtagString = function (pet) {
            var s = ""
            for (var i = 0; i < pet.hashtags.length; i++) {
                s += "#" + pet.hashtags[i] + " ";
            }
            s = s.trim();
            return s;
        };

        this.next = function () {
            $scope.index++;
            if ($scope.index >= $scope.pets.length) $scope.index = 0;
            $scope.currPet = $scope.pets[$scope.index];
        };


        this.upvote = function () {
            $scope.currPet.upvotes++;
            $scope.updatePet($scope.currPet);
            this.next();
        };

        this.downvote = function () {
            $scope.currPet.downvotes++;
            $scope.updatePet($scope.currPet);
            this.next();
        };

        $timeout(function() {
            $scope.justOpened = false;
        }, 5000);


        $('.addpet-container').click(function(event){
            event.stopPropagation();
        });

        $('html').click(function() {
            $scope.$apply(function () {
                $scope.showAddPet = false;
            });
        });

        this.add = function (form) {
            var pet = {};
            if (form.name) pet.name = form.name.trim();
            else pet.name = "Boolean";
            if (form.bio) pet.bio = form.bio.trim();
            else pet.bio = "Lives life to the fullest";
            if (form.imageurl) pet.imageurl = form.imageurl.trim();
            else pet.imageurl = "/images/pet.jpg";
            form.upvotes = 1;
            form.downvotes = 1;
            pet.hashtags = [];
            form.hashtags = form.hashtags.split(" ");
            for (var i = 0; i < form.hashtags.length; i++) {
                if (form.hashtags[i].length < 2) continue;
                if (form.hashtags[i].substring(0,1) === '#') {
                    pet.hashtags[i] = form.hashtags[i].substring(1,form.hashtags[i].length);
                }
            }
            $scope.updatePet(form);
            $scope.currPet = pet;
            $scope.showAddPet = false;
            $scope.form = {};
        }



    }]);






})();

