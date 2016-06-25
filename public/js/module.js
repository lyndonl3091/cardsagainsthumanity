'use strict'

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {url: '/', template: '<h1>Home</h1>'})
      .state('StartGame', {url: '/game1', templateUrl: 'html/startGame.html', controller: 'startGameCtrl'})
      .state('judgeScreen', {url: '/game2', templateUrl: 'html/judgeScreen.html', controller: 'judgeScreenCtrl'})
      .state('player', {url: '/game3', templateUrl: 'html/player.html', controller: 'playerCtrl'})
      .state('game4', {url: '/game4', templateUrl: 'html/game4.html', controller: 'game4Ctrl'})

    //user tries to go somewhere we dont have, just send to home
    $urlRouterProvider.otherwise('/');
});
