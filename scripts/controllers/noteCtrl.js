'use strict';

angular.module('NoteApp')
  .controller('NoteCtrl', function ($scope, $routeParams, $location, Notes) {

  	var id = $routeParams.id;
	$scope.newNote = {
  		text:  "",
		title:  ""
	}

  	Notes.get(id).then(function(note){
      $scope.newNote.title = note.title;
      $scope.newNote.text = note.text;
      $scope.isDone = true;
    }, function(){
      $location.url('/');
    });

  	function save(cb){
      Notes.get(id).then(function(note){
        note.text = $scope.newNote.text;
        note.title = $scope.newNote.title;
        note.updated = new Date();
        Notes.update(note).then(function(){
          cb();
        });
      });
  	}

    $scope.needSave = function() {
      $scope.isDone = false;
    }

    $scope.done = function(){
      save(function(){
        $scope.isDone = true;
      });
    }

    $scope.back = function(){
      if(!$scope.isDone){
        save(function(){
          $location.url('/');
        });
      }else{
        $location.url('/');
      }
    }
  });