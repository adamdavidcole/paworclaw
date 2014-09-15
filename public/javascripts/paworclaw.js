/**
 * Created by acole9 on 9/15/14.
 */
/**
 * Created by elanastroud on 9/13/14.
 */
console.log("outside ang");
(function () {

    var app = angular.module("paworclaw", ['ngAnimate']);

    app.controller('controller', ['$window', '$scope', '$http', '$timeout', function ($window, $scope, $http, $timeout) {
        $scope.justOpened = true;

        this.loadUsers = function () {
            $http.get('/users').success(function(docs) {
                $scope.users = docs;
                $scope.currPet = docs[0].pets[0];
            }).error(function () {
                console.log('fail');
            });
        }

        this.loadUsers();
        $scope.index = 0;
        $scope.currUser = user1;
        $scope.currPet = user1.pets[$scope.index];

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
            if ($scope.index >= $scope.users.length) $scope.index = 0;
            $scope.currPet = $scope.users[$scope.index].pets[0];
        };


        this.upvote = function () {
            $scope.currPet.upvotes++;
            this.next();
        };

        $timeout(function() {
            $scope.justOpened = false;
        }, 5000);

        $scope.updateUser = function (user) {
            $http.post('/users/update',user).success(function () {
                console.log('user posting');
            }).error(function () {
                console.log('failed to post');
            });
        };

        $scope.currUser.name = "I UPDATED THIS NAME THROUGH HTTP!";
        $scope.updateUser($scope.currUser);


    }]);




})();

