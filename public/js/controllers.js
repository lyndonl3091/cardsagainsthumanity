'use strict'

var app = angular.module('myApp');


var blackCardArray = [];
var numPlayers = 0;

var blackCard = [
{
text: "Why can't I sleep at night?",
pick: 1
},
{
text: "I got 99 problems but _ ain't one.",
pick: 1
},
{
text: "What's a girl's best friend?",
pick: 1
}
];

var whiteCardArray = [
"Coat hanger abortions.",
"Man meat.",
"Autocannibalism.",
"Vigorous jazz hands.",
"Flightless birds.",
"Pictures of boobs.",
"Doing the right thing.",
"The violation of our most basic human rights.",
"Viagra&reg;.",
"Self-loathing.",
"Spectacular abs.",
"A balanced breakfast.",
"Roofies.",
"Concealing a boner.",
"Amputees.",
"The Big Bang.",
"Former President George W. Bush.",
"The Rev. Dr. Martin Luther King, Jr.",
"Smegma.",
"Being marginalized.",
"Cuddling.",
"Laying an egg.",
"The Pope.",
"Aaron Burr.",
"Genital piercings.",
"Fingering.",
"A bleached asshole.",
"Horse meat.",
"Fear itself."
];

// var randomWhiteCard = whiteCard[Math.floor(Math.random() * whiteCard.length)]
var randomBlackCard = blackCard[Math.floor(Math.random() * blackCard.length)]
console.log("LIne 22 ",randomBlackCard);
console.log("line 1: " + numPlayers);
console.log(numPlayers);
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

  // console.log($scope.playersAvailable);

  // console.log('$stateParams:', $stateParams);
  $scope.players = function (){
    $scope.playersAvailable = $scope.numberOfPlayers
    numPlayers = $scope.playersAvailable
    console.log("line 31: " + numPlayers);

  }
  // console.log("line 34:",$scope.playersAvailable);

});


app.controller('game2Ctrl', function($scope, $stateParams){
  console.log("game2Ctrl");
  console.log('$stateParams:', $stateParams);
  $scope.blackCardArrayStuff = blackCardArray
});

/////////////////////////////
app.controller('game3Ctrl', function($scope, $stateParams){

  $scope.whiteCards = whiteCardArray


  console.log("game3Ctrl");
  $scope.blackCardValue = randomBlackCard.text;

  console.log('$stateParams:', $stateParams);

  $scope.submitWhiteCard = function(card,index){
    console.log(card);
    console.log(index);
    blackCardArray.push(card)
    $scope.whiteCards.splice(index,1)
  }
});

///////////////////////////////
app.controller('game4Ctrl', function($scope, $stateParams){
  console.log("game4Ctrl");
  //console.log('$stateParams:', $stateParams);
});
