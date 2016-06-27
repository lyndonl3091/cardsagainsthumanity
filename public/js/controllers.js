'use strict'

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $http, $state, Deck){

	const HANDSIZE = 10;
	const SCORETOWIN = 7;

	$scope.game = {numPlayers:5};

	$scope.currPlayer;
	var whiteCards;
	var blackCards;
	$scope.lastPooped = [3,4,1];
	$scope.lastPooped = [];
	$scope.currBlackCard;




	$scope.startGame = function(){
		fillBlackDeck()
		.then(fillWhiteDeck)
		.then(function (){
			getBlackCard();
			createPlayers();
			//  reset submittedWhiteCards with space for each player's submission
			//  there are holes in the array. 
			$scope.submittedWhiteCards = [];
			for (let i = 0; i < $scope.game.numPlayers; i++){
				if(!$scope.players[i].czar)
					$scope.submittedWhiteCards[i] = [];
			}

			$scope.currWhiteCards = [];

			pickCzar();
			$scope.currWhiteCards = $scope.players[$scope.currPlayer].hand;
			$state.go('player');
		})
		.catch(err=>{
			console.log(err);
		});
	}


	function populateHands(){
		for (let i = 0, len = $scope.players.length; i < len; i++){
			$scope.players[i].hand.push(...getWhiteCards(HANDSIZE - $scope.players[i].hand.length))
		}
	}


	$scope.judgePicks = index => {
		//  winning player goes first next round
		$scope.currPlayer = index;
		$scope.players[$scope.currPlayer].score++;
		populateHands();
		swal({   title: "Sweet!",   text: "Here's a custom image.",   imageUrl: "images/thumbs-up.jpg" }, newRound);
		//  sweetAlert triggers

	}


	function newRound(){
		getBlackCard();
		if($scope.players[$scope.currPlayer].score === SCORETOWIN){
			$state.go('endGameScreen');
		} else {
			changeCzar();
			$state.go('player');
		}
		$scope.submittedWhiteCards = [];
		for (let i = 0; i < $scope.game.numPlayers; i++){
			if(!$scope.players[i].czar)
				$scope.submittedWhiteCards[i] = [];
		}
		console.log( $scope.submittedWhiteCards);
	}



	function changeCzar() {
		for(var index = $scope.players.length - 1; index >= 0 ; index--){
			if ($scope.players[index].czar) {
				$scope.players[index].czar = false;
				$scope.players[(index + 1) % $scope.players.length].czar = true;
			}
		}
	}





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
		return Deck.getBlack()
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

		for(let i =0; i<$scope.game.numPlayers; i++){
			let playerToAdd = {
				hand: getWhiteCards(10),
				czar: false,
				points: 0,
				pooped: $scope.lastPooped[i]
			}
			$scope.players.push(playerToAdd);
		}
		console.log("players: ", $scope.players);
	}

	function pickCzar(){
		var min = Infinity;
		var czarIndex = 0;
		for(let i =0; i< $scope.game.numPlayers; i++){
			if($scope.players[i].pooped < min){
				min = $scope.players[i].pooped;
				czarIndex =i;
			}

		}
		$scope.players[czarIndex].czar = true;
		if(czarIndex == $scope.game.numPlayers-1)
			czarIndex = -1;
		$scope.currPlayer = czarIndex+1;
	}

	function getBlackCard(){
		if(blackCards.length === 0){
			fillBlackDeck()
			.then(function() {
				$scope.currBlackCard = blackCards.splice(0, 1)[0];
			});
		} else {
			$scope.currBlackCard = blackCards.splice(0, 1)[0];
		}
	}

	function getWhiteCards(numCards){
		if(whiteCards.length < numCards){
			fillWhiteDeck()
			.then(function() {
				return whiteCards.splice(0, numCards);
			});
		} else {
			return whiteCards.splice(0, numCards);
		}
	}

	$scope.submitWhiteCard = function(card,index){
		card.player = $scope.currPlayer;
		console.log(card.player);
		$scope.submittedWhiteCards[card.player].push(card);
		$scope.players[card.player].hand.splice(index, 1);
		let length  = getLength($scope.submittedWhiteCards);
		if(!(length % $scope.currBlackCard.pick))
			nextPlayer();

	}

	function getLength(nestedArr){
		var flattened = nestedArr.reduce(function(a, b) {
			return a.concat(b);
		}, []);

		return flattened.length;
	}

	function nextPlayer(){

		$scope.currPlayer = ($scope.currPlayer + 1) % $scope.players.length;
		if($scope.players[$scope.currPlayer].czar === true)
			$scope.currPlayer = ($scope.currPlayer + 1) % $scope.players.length;

		$scope.currWhiteCards = $scope.players[$scope.currPlayer].hand;

		//check if white cards = pick*numplayers

		let length  = getLength($scope.submittedWhiteCards);
		if(length === $scope.currBlackCard.pick*($scope.game.numPlayers -1)){
			$state.go('judgeScreen');
		}
	}

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



});







app.controller('startGameCtrl', function($scope, $stateParams){
});


app.controller('judgeScreenCtrl', function($scope, $stateParams){

});

app.controller('playerCtrl', function($scope, $stateParams){
});

app.controller('game4Ctrl', function($scope, $stateParams){
});
