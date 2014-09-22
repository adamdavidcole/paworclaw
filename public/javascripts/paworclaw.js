/**
 * Created by acole9 on 9/15/14.
 */
/**
 * Created by elanastroud on 9/13/14.
 */

(function () {

    var app = angular.module("paworclaw", ['ngAnimate']);


    app.directive('httpPrefix', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                function ensureHttpPrefix(value) {
                    // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                    if(value && !/^(http):\/\//i.test(value) && 'http://'.indexOf(value) === -1) {
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
        $scope.isUpvote = true;
        $scope.pets = [user1];

        $scope.testrepeat = [{img: 'images/pet.jpg'},{img: 'images/cat.jpg'},{img:'images/husky.jpg'}];

        this.loadPets = function () {
            $http.get('/users').success(function(docs) {
                $scope.pets = docs;
//                console.log(JSON.stringify(docs));
              //  $scope.currPet = docs[0].pets[0];
                $scope.index = 0;

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

        $scope.currPet = user1;

        this.getPercantage = function(pet) {
            var score = pet.upvotes/(pet.upvotes+pet.downvotes);
            return Math.round(score * 100);
        };

        this.getHashtagString = function (pet) {
            var s = "";
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
            if ($scope.currPet._id) $scope.updatePet($scope.currPet);
            $scope.isUpvote = 'upvote';
            this.next();
        };

        this.downvote = function () {
            $scope.currPet.downvotes++;
            if ($scope.currPet._id) $scope.updatePet($scope.currPet);
            $scope.isUpvote = 'downvote';
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

            var valid = true;
            if (form.name) pet.name = form.name.trim();
            else valid = false;
            if (form.bio) pet.bio = form.bio.trim();
            else pet.bio = "";
            if (form.imageurl && $scope.isImageURl(form.imageurl)) pet.imageurl = form.imageurl.trim();
            else {
                valid = false;
                console.log("invalid image url");
            }

            pet.upvotes = 1;
            pet.downvotes = 1;

            pet.hashtags = [];
            if (form.hashtags) {
                form.hashtags = form.hashtags.split(" ");
                for (var i = 0; i < form.hashtags.length; i++) {
                    if (form.hashtags[i].length < 2) continue;
                    if (form.hashtags[i].substring(0, 1) === '#') {
                        pet.hashtags[i] = form.hashtags[i].substring(1, form.hashtags[i].length);
                    }
                }
            }

            if (valid) {
                $scope.updatePet(pet);
                $scope.currPet = pet;
                $scope.pets.splice($scope.index + 1, 0, pet);
            } else {
                console.log("invalid entry");
            }

            $scope.showAddPet = false;
            $scope.form = {};
            this.next();
        };

         $scope.isImageURl = function (url) {
            if (!url || url.length <= 3) {
                console.log("url link too short");
                console.log(url);
                return false;
            }
            else {
                var ext = url.substring(url.length - 4, url.length);
                console.log(ext);
                if (ext !== '.jpg'  && ext !== '.png' && ext !== '.gif') return false;
                else return true;
            }
        };





        this.printThese = function(sindex,index) {
            console.log("sindex: " + sindex);
            console.log('index: ' + index);
        };

    }]);

})();

