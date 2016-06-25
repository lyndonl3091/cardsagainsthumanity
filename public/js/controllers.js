'use strict'

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $http){
  console.log("mainCtrl!");
  let Deck = [];


  $http.get('cardData/cards.json')
  .then(data =>{
    console.log("data: ",data);
  })
  .catch(err =>{
    console.error("Err: ", err);
  });


});


app.controller('game1Ctrl', function($scope, $stateParams){
  console.log("game1Ctrl");
  console.log('$stateParams:', $stateParams);
  


});


app.controller('game2Ctrl', function($scope, $stateParams){
  console.log("game2Ctrl");
  console.log('$stateParams:', $stateParams);
});


app.controller('game3Ctrl', function($scope, $stateParams){
  console.log("game3Ctrl");
  console.log('$stateParams:', $stateParams);
});


app.controller('game4Ctrl', function($scope, $stateParams){
  console.log("game4Ctrl");
  //console.log('$stateParams:', $stateParams);
});

