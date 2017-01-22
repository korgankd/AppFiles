angular.module('starter.controllers', ['starter.services','ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicAuth, $ionicUser) {
  $scope.user = {"username":"Not logged in."};
  $scope.loginData = {};
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
    var details = {"email": $scope.loginData.email, "password": $scope.loginData.password};
    $ionicAuth.login('basic', details).then(function() {
      alert($ionicAuth.isAuthenticated());
      $scope.modal.hide();

      $scope.user = $ionicUser.details;
      console.log($scope.user);

    }, function(err) {
        for (var e of err.details) {
          alert(e);
        }
    });
  };

  $scope.doRegister = function() {
    var details = {"email": $scope.loginData.email, "username": $scope.loginData.username, "password": $scope.loginData.password};
    $ionicAuth.signup(details).then(function(){
      alert("Signup Success! " + details.username);
    }, function(err) {
      for (var e of err.details) {
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          alert(e);
        }
      }
    });
  }

})

.controller('ProfileCtrl', function($scope, $ionicModal, $timeout, $ionicAuth, $ionicUser) {
  if($ionicAuth.isAuthenticated()) {
    $scope.user = $ionicUser.details;
    if($scope.user.description == undefined) {
      document.getElementById("description").innerHTML = '<input type="text" ng-model="userData.description">';
    }
  }

  $scope.checkAuth = function() {
    alert($ionicAuth.isAuthenticated() + " " + $ionicUser.details.name);
  };

  $scope.logout = function() {
    $ionicAuth.logout();
    $scope.user = {};
    alert("Successfully logged out.");
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
});