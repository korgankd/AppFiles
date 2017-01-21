angular.module('starter.controllers', ['starter.services','ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicAuth, $ionicUser) {
  var details = {"email":"hi@ionic.io","password":"password"};
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $scope.doRegister = function() {
    $ionicAuth.signup(details).then(function(){
      alert("user signup hi@ionic.io, password");
    }, function(err) {
    for (var e of err.details) {
      if (e === 'conflict_email') {
        alert('Email already exists.');
      } else {
        alert(e);
      }
    }
  });
    alert("do Register funtion!");
  }
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    alert("do login function!");
    ourRequest.send();
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SearchCtrl', function($scope) {
  $scope.output = "new output";
})

.controller('AccountsCtrl', function($scope, Account) {
    $scope.accounts = [
      {id:0, user:"korgankd", password:"password", name:"Kent Korgan", description: "This is the description of the Kent Korgan account. It should give some information about this user.", availability:"Kent's availability", media:"Kent's media", location:"11257 Ramrod Road, Woodbridge VA", image:"http://i.huffpost.com/gen/964776/images/o-CATS-KILL-BILLIONS-facebook.jpg"},
      {id:1, user:"kentcl", password:"password", name:"Clark Kent", description: "This is the description of the Clark Kent account. It should give some information about this user.", availability:"Clark's availability", media:"Clark's media", location:"North Pole Fortress of Solitude", image:"http://i.huffpost.com/gen/964776/images/o-CATS-KILL-BILLIONS-facebook.jpg"}
    ];/*
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/korgankd/AppFiles/master/server/routes/accounts.json');
    ourRequest.onload = function() {
      var ourData = JSON.parse(ourRequest.responseText);
    }
    ourRequest.send();*/
})

.controller('AccountCtrl', function($scope, $stateParams, Account) {
    $scope.account = Account.get({accountId: $stateParams.accountId});
})

.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
    
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
});
