'use strict';

angular.module('NoteApp')
  .controller('NewNoteCtrl', function ($scope, $routeParams, $location, Notes) {

    $scope.isDone = true;

	$scope.newNote = {
  		text:  "",
		title:  ""
	}
	
    function save (cb) {
      var text = $scope.newNote.text;
      var title = $scope.newNote.title;
      if(text || title){
        var vnewNote = {
          title : title,
          text : text,
          date : new Date
        }
        Notes.add(vnewNote).then(function(note){
          if(cb)
            cb(note);
        });
      }
    }

    $scope.needSave = function() {
      $scope.isDone = false;
    }

    $scope.done = function(){
      save(function(note){
        $location.url('note/'+note.id);
        $location.replace();
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