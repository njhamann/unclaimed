//app
var app = angular.module('unclaimed', [], function($routeProvider, $locationProvider) {
    
    $routeProvider.when('/', {
        templateUrl: '/templates/index.html',
        controller: IndexCntl
    });
    
    $routeProvider.when('/new', {
        templateUrl: '/templates/new.html',
        controller: NewCntl
    });
    
    $routeProvider.when('/new/:id', {
        templateUrl: '/templates/new.html',
        controller: NewReboundCntl
    });
    
    $routeProvider.when('/:id', {
        templateUrl: '/templates/post.html',
        controller: PostCntl
    });

    $locationProvider.html5Mode(true);
});

//directives
app.directive('setFocus', function() {
    return function(scope, el, attrs){
        $(el).focus();
    };
});

app.directive('wysiwygControl', function() {
    return function(scope, el, attrs){
        var editor = new MediumEditor('#'+attrs.id);
    };
});

app.directive('customPlaceholder', function() {
    return function(scope, el, attrs){
        $(el).on('keydown keyup', function(e){
            $('#'+attrs.customPlaceholder).hide();
        });

        $(el).on('blur', function(){
            if($(this).text()){
                $('#'+attrs.customPlaceholder).hide();
            }else{
                $('#'+attrs.customPlaceholder).show();
            }
        });
        
    };
});


//controllers
function IndexCntl($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}


function NewCntl($scope, $http, $location){
    $scope.url = '/api/save';
    $scope.save = function(){
        var postData = {};
        postData.title = document.getElementById('title').innerHTML;
        postData.body = document.getElementById('body').innerHTML;
        $http.post($scope.url, postData).success(function(d) {
            if(d.success){
                $location.path('/'+d.id);
            }
        }).error(function(e) {                                     
            console.log('error');
        });                                                        
    };
}

function NewReboundCntl($scope, $http, $location, $routeParams){
    $scope.getUrl = '/api/get/'+$routeParams.id;
    $scope.postId = $routeParams.id;
    $http.get($scope.getUrl).success(function(d) {
        $scope.post = d.post; 
        $('#title, #body').trigger('keyup');
    }).error(function(e) {                                     
        console.log('error');
    });                                                        
    
    $scope.saveUrl = '/api/save';
    $scope.save = function(){
        var postData = {};
        postData.remix_id = document.getElementById('remix_id').value;
        postData.title = document.getElementById('title').innerHTML;
        postData.body = document.getElementById('body').innerHTML;
        $http.post($scope.saveUrl, postData).success(function(d) {
            if(d.success){
                $location.path('/'+d.id);
            }
        }).error(function(e) {                                     
            console.log('error');
        });                                                        
    };
}

function PostCntl($scope, $routeParams, $http){

    $scope.url = '/api/get/'+$routeParams.id;
    $scope.postId = $routeParams.id;
    $http.get($scope.url).success(function(d) {
        $scope.post = d.post; 
    }).error(function(e) {                                     
        console.log('error');
    });                                                        
    
}

