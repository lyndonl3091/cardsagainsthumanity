'use strict'

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $http, $state, Deck){

	const HANDSIZE = 10;
	const SCORETOWIN = 7;

	$scope.startGame = {
		numPlayers:6,
		names:[],
		poops:[],
	};

	$scope.$watch('startGame.numPlayers', function(newVal,oldVal) {
		$scope.startGame.numPlayersArray = makeNumPlayersArray(newVal);
	},true);

	



	$scope.currPlayer;
	var whiteCards;
	var blackCards;
	$scope.currBlackCard;



	function makeNumPlayersArray(num){
		return new Array(num);
	}


	$scope.startGame = function(){
		fillBlackDeck()
		.then(fillWhiteDeck)
		.then(function (){
			getBlackCard();
			createPlayers();
			//  reset submittedWhiteCards with space for each player's submission
			//  there are holes in the array.
			$scope.submittedWhiteCards = [];
			for (let i = 0; i < $scope.startGame.numPlayers; i++){
				if(!$scope.players[i].czar)
					$scope.submittedWhiteCards[i] = [];
			}


			pickCzar();
			$state.go('playerScreen');
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
		console.log();
		//  winning player goes first next round
		$scope.currPlayer = index;
		console.log( $scope.players[$scope.currPlayer].score);
		$scope.players[$scope.currPlayer].score++;
		if($scope.players[$scope.currPlayer].score === SCORETOWIN){
			$state.go('endGameScreen');
		}
		else {
			populateHands();
			swal({   title: "Sweet!",   text: "Here's a custom image.",   imageUrl: "images/thumbs-up.jpg" }, newRound);
			//  sweetAlert triggers
		}
	}


	function newRound(){
		getBlackCard();

		$state.go('playerScreen');

		changeCzar();
		if ($scope.players[$scope.currPlayer].czar)
			$scope.currPlayer = ($scope.currPlayer + 1) % $scope.players.length;
		$scope.submittedWhiteCards = [];

		for (let i = 0; i < $scope.startGame.numPlayers; i++){
			if(!$scope.players[i].czar)
				$scope.submittedWhiteCards[i] = [];
		}
	}


	function changeCzar() {
		for(var index = $scope.players.length - 1; index >= 0 ; index--){
			if ($scope.players[index].czar) {
				$scope.players[index].czar = false;
				$scope.players[(index + 1) % $scope.players.length].czar = true;
				break;
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

		for(let i =0; i<$scope.startGame.numPlayers; i++){
			let playerToAdd = {
				name: $scope.startGame.names[i],
				hand: getWhiteCards(10),
				czar: false,
				score: 0,
				pooped: $scope.startGame.poops[i]
			}
			$scope.players.push(playerToAdd);
		}
		console.log("players: ", $scope.players);
	}

	function pickCzar(){
		var min = Infinity;
		var czarIndex = 0;
		for(let i =0; i< $scope.startGame.numPlayers; i++){
			if($scope.players[i].pooped < min){
				min = $scope.players[i].pooped;
				czarIndex =i;
			}
			$scope.players[czarIndex].czar = true;
		}
		$scope.currPlayer = (czarIndex + 1) % $scope.players.length;
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


		//check if white cards = pick*numplayers

		let length  = getLength($scope.submittedWhiteCards);
		if(length === $scope.currBlackCard.pick*($scope.startGame.numPlayers -1)){
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







app.controller('startGameScreenCtrl', function($scope, $stateParams){
});


app.controller('judgeScreenCtrl', function($scope, $stateParams){

});

app.controller('playerScreenCtrl', function($scope, $stateParams){
});

app.controller('endGameScreenCtrl', function($scope, $stateParams){
});
