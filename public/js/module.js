'use strict'

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {url: '/', template: '<h1>Home</h1>'})
      .state('game1', {url: '/game1', templateUrl: 'html/game1.html', controller: 'game1Ctrl'})
      .state('game2', {url: '/game2', templateUrl: 'html/game2.html', controller: 'game2Ctrl'})
      .state('game3', {url: '/game3', templateUrl: 'html/game3.html', controller: 'game3Ctrl'})
      .state('game4', {url: '/game4', templateUrl: 'html/game4.html', controller: 'game4Ctrl'})

    //user tries to go somewhere we dont have, just send to home
    $urlRouterProvider.otherwise('/');
});
