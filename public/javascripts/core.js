angular.module('noone', [], function($routeProvider, $locationProvider) {
    
    $routeProvider.when('/', {
        templateUrl: '/templates/index.html',
        controller: IndexCntl
    });
    
    $routeProvider.when('/new', {
        templateUrl: '/templates/new.html',
        controller: NewCntl
    });
    
    $routeProvider.when('/:id', {
        templateUrl: '/templates/post.html',
        controller: PostCntl
    });

    $locationProvider.html5Mode(true);
});

function IndexCntl($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}

function NewCntl($scope, $http){

    var editor = new MediumEditor('.medium-toolbar');
    $scope.url = '/api/save';
    $scope.save = function(){
        var postData = {};
        postData.title = document.getElementById('title').innerHTML;
        postData.body = document.getElementById('body').innerHTML;
        $http.post($scope.url, postData).success(function(d) {
            window.location = '/'+d.id;
            console.log(d);
        }).error(function(e) {                                     
            console.log('error');
        });                                                        
    };

}

function PostCntl($scope, $routeParams, $http){

    $scope.url = '/api/get/'+$routeParams.id;
    $http.get($scope.url).success(function(d) {
        $scope.post = d.post; 
        console.log(d);
    }).error(function(e) {                                     
        console.log('error');
    });                                                        

}

