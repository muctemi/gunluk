'use strict';

angular.module('NoteApp', ['ionic','ngRoute'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl',
        resolve : {
          showButton : [ '$rootScope', function($rootScope){
            $rootScope.hideButton = false;
          }]
        }
      })
      .when('/new', {
        templateUrl : 'views/note.html',
        controller : 'NewNoteCtrl',
        resolve : {
          hideButton : ['$rootScope', function($rootScope){
            $rootScope.hideButton = true;
          }]
        }
      })
      .when('/note/:id', {
        templateUrl : 'views/note.html',
        controller : 'NoteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  