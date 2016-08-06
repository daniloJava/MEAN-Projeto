

    angular.module('poolApp', [])
      .controller('PoolController', function ($scope, $http) {
        var pc = this;
     
        function Vote() {
            this.name = '';
            this.candidate = '';
        }
          
        pc.vote = new Vote();

        pc.votes = [];

        $http.get('/listPools').success(function (myData) {
            pc.votes = myData.votes;
        });

        pc.addVote = function() {

            pc.vote.name = pc.name;
            pc.vote.candidate = pc.candidate;

            $http.post('/addPool', pc.vote).success(function () {
               pc.votes.push(pc.vote);
               pc.vote = new Vote();

               pc.name= '';
               pc.candidate = '';
            });
        };
});

