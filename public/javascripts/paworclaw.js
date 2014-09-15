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
        $scope.showAddPet = false;

        this.loadUsers = function () {
            $http.get('/users').success(function(docs) {
                $scope.users = docs;
                //$scope.currPet = docs[0].pets[0];
            }).error(function () {
                console.log('fail');
            });
        };

        $scope.updateUser = function (user) {
            $http.post('/users/update',user).success(function () {
                console.log('user posting');
            }).error(function () {
                console.log('failed to post');
            });
        };

        this.loadUsers();
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
            if ($scope.index >= $scope.users.length) $scope.index = 0;
            $scope.currPet = $scope.users[$scope.index].pets[0];
        };


        this.upvote = function () {
            $scope.currPet.upvotes++;
            $scope.updateUser($scope.currUser);
            this.next();
        };

        this.downvote = function () {
            $scope.currPet.downvotes++;
            $scope.updateUser($scope.currUser);
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
            console.log(JSON.stringify($scope.form));
        });

        this.add = function (form) {
            console.log(JSON.stringify(form));
//            $scope.updateUser();
        }



    }]);






})();

