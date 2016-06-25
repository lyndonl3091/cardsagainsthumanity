'use strict'

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {url: '/', template: '<h1>Home</h1>'})
      .state('startGame', {url: '/startGame', templateUrl: 'html/startGame.html', controller: 'startGameCtrl'})
      .state('judgeScreen', {url: '/judgeScreen', templateUrl: 'html/judgeScreen.html', controller: 'judgeScreenCtrl'})
      .state('player', {url: '/player', templateUrl: 'html/player.html', controller: 'playerCtrl'})
      .state('game4', {url: '/game4', templateUrl: 'html/game4.html', controller: 'game4Ctrl'})

    //user tries to go somewhere we dont have, just send to home
    $urlRouterProvider.otherwise('/');
});
