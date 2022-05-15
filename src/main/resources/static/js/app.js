(function(){

  var app = angular.module('notesApp',['ngRoute', 'ngMaterial']);

  app.config(['$locationProvider', '$routeProvider',
      function ($locationProvider, $routeProvider) {

        $routeProvider
          .when('/', {
            templateUrl: '/partials/notes-view.html',
            controller: 'notesController'
          })
 
          .when('/login', {
             templateUrl: '/partials/login.html',
             controller: 'loginController',
          })
          .otherwise('/');
      }
  ]);

  app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
      $rootScope.$on('$routeChangeStart', function (event, current) {

		 
          if ($location.path() == "/login"){
				sessionStorage.removeItem("userName");
				sessionStorage.removeItem("password"); 
             return;
          }

		if(current.templateUrl == "/partials/notes-view.html"){
			if(sessionStorage.getItem("userName") != null && sessionStorage.getItem("password") != null){
					
				 return;
				} else {
					$location.path('/login');
				}
			}
			
          if (!AuthService.isLoggedIn()) {
              console.log('DENY');
              event.preventDefault();
              $location.path('/login');
          }
      });
  }]);


  app.service('AuthService', function($http){
        var loggedUser = null;
		var errorText = null;
        function login (username, password){
            return $http.post("api/login", {username: username, password: password}).then(function(user){
				if(user) {
               	 loggedUser = user;
				}
            }, function(error){
                loggedUser = null; 
				  $scope.invalidCreds = true;
            })
        }



        function isLoggedIn(){
            return loggedUser != null;
        }
        return {
            login : login,
            isLoggedIn: isLoggedIn
        }
  });

  app.controller('loginController', function($scope, AuthService, $location){

    $scope.invalidCreds = false;
    $scope.login = {
        username : null,
        password : null
    };

    $scope.login = function(){
        AuthService.login($scope.login.username, $scope.login.password).then(function(user){
            console.log(user); 
            $location.path("/");
			sessionStorage.setItem("userName",$scope.login.username);
			sessionStorage.setItem("password",$scope.login.password);
			
        }, function(error){
            console.log(error);
            $scope.invalidCreds = true;
        });
    };
  });


  app.controller('notesController', function($scope, AuthService,$http){

    $scope.isEditCreateView = false;
	$scope.invalidNote = false;
	$scope.color = null;
	$scope.note = null;

    $scope.newNoteView = function(){
		$scope.invalidNote = false;
        $scope.isEditCreateView = true;
    };

	 $scope.newNoteView2 = function(color, note){
		$scope.invalidNote = false;
        $scope.isEditCreateView = true;
		$scope.color = color;
		$scope.note = note;
    };


    $scope.deleteNote = function (i) {
      var r = confirm("Are you sure you want to delete this note?");
      if (r == true){
        //TODO delete the note
      }
    };

	$scope.saveNote = function (color, note) {
			console.log(color);
			if(color != null && note != null) {
           		 return $http.post("api/saveNote/"+sessionStorage.getItem("userName"), {color : color, note : note}).then(function(){ 
          		 $scope.isEditCreateView = false;
				 $scope.viewNote();
       			 }, function(error){
           			 console.log(error); 
					 $scope.invalidNote = true;
       			 });
			} else {
				$scope.invalidNote = true;
			}
    };

$scope.cancelNote = function () { 
 $scope.isEditCreateView = false;
    };



    $scope.viewNote = function(){
        //TODO 
		  $http({
           method : "GET",
           url : "http://localhost:8080/api/getNotes/"+sessionStorage.getItem("userName")
  }).then(function mySuccess(response) {
    $scope.notes = response.data;
  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });
    };


  $scope.viewSelectedNote = function(){  
 	$scope.isEditCreateView = true;	 
    }
 
	
  });


})();