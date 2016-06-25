'use strict'

var app = angular.module('myApp');

var numPlayers = 5;

app.controller('mainCtrl', function($scope, $http, Deck){

  var whiteCards;
  var blackCards;
  $scope.lastPooped = [5,3,2,6,6];
  $scope.blackCard;


  //current white cards to display
  $scope.currWhiteCards;

  //submitted whote cards
  $scope.submittedWhiteCards;

  fillBlackDeck();
  fillWhiteDeck()
  .then(createPlayers);

  function fillWhiteDeck(){
    return Deck.getWhite()
    .then( res =>{
      whiteCards = res;
      whiteCards = shuffle(whiteCards);
    })
    .catch(err =>{
      console.log("err: ", err);
    })
  }

  function fillBlackDeck() {
    Deck.getBlack()
    .then( res =>{
      blackCards = res;
      blackCards = shuffle(blackCards);
    })
    .catch(err =>{
      console.log("err: ", err);
    })
  }

  function createPlayers(){
    $scope.players = [];
    
    for(let i =0; i<numPlayers; i++){
      let currPlayer = {
        hand: getCards(10),
        czar: false,
        points: 0,
        pooped: $scope.lastPooped[i]
      }
      $scope.players.push(currPlayer);
    }
    console.log("players: ", $scope.players);
  }

  function pickCzar(){
    var min = Infinity;
    var czarIndex = 0;
    for(let i =0; i< numPlayers; i++){
      if($scope.players[i].lastPooped < min){
        min = $scope.players[i].lastPooped;
        czarIndex =i;
      }
    }
    $scope.players[i].czar = true;
  }

  function getBlackCard(){
    if(blackCards.length === 0){
      fillBlackDeck();
    }
    return blackCards.splice(0, 1);
  }

  function getCards(numCards){
    console.log("whiteCards", whiteCards);
    if(whiteCards.length < numCards){
      fillWhiteDeck();
    }
    return whiteCards.splice(0, numCards);
  }

});


function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}











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

