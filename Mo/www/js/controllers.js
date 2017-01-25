angular.module('starter.controllers', ['starter.services','ionic.cloud'])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $ionicAuth, $ionicUser) {
  $scope.user = {"username":""};
  $scope.loginData = {};
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Create the login modal that we will use later
$ionicModal.fromTemplateUrl('templates/login.html', {     scope: $scope
}).then(function(modal) {     $scope.modal = modal;   });

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
      alert("Login Successful.");
      $scope.modal.hide();
      console.log($ionicUser);

      $scope.user = $scope.updateUser();

    }, function(err) {
      alert("Incorrect email or password.");
        for (var e of err.details) {
          alert(e);
        }
    });
  };

  $scope.doRegister = function() {
    if($ionicAuth.isAuthenticated()) {
      $ionicAuth.logout();
    }

    var details = {"email": $scope.loginData.email, "password": $scope.loginData.password};
    $ionicAuth.signup(details).then(function(){
      $scope.user = scope.updateUser();
      alert("Signup Success! " + details.email);
    }, function(err) {
      for (var e of err.details) {
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          alert(e);
        }
      }
    });
  };

  $scope.updateUser = function() {
    console.log($ionicUser);
    var scopeUser = {name:"", username:"", email:"", description:"", location:"", image:""};
    if($ionicAuth.isAuthenticated()) {
      scopeUser = $ionicUser.details;
      //check for properties to update scope.user
      if($ionicUser.data.data.location != undefined) {
        scopeUser.location = $ionicUser.data.data.location;
      } 
      if($ionicUser.data.data.description != undefined) {
        scopeUser.description = $ionicUser.data.data.description;
      }
    }
    console.log(scopeUser);
    return scopeUser;
  };

})

.controller('ProfileCtrl', function($scope, $ionicModal, $timeout, $ionicAuth, $ionicUser) {
  $scope.userData = {};

  angular.element(document).ready(function () {
    $scope.user = $scope.updateUser();
  });

  $scope.updateUser = function() {
    console.log("$ionicUser");
    console.log($ionicUser);
    var scopeUser = {name:"", username:"", email:"", description:"", location:"", image:""};
    if($ionicAuth.isAuthenticated()) {
      scopeUser = $ionicUser.details;
      //check for properties to update scope.user, if they exist - hide input bar
      if(scopeUser.username != "") {
        document.getElementById("username").style.display = "none";
      }
      if(scopeUser.name != "") {
        document.getElementById("name").style.display = "none";
      }
      if($ionicUser.data.data.location != undefined) {
        scopeUser.location = $ionicUser.data.data.location;
        document.getElementById("location").style.display = "none";
      }
      if($ionicUser.data.data.description != undefined) {
        scopeUser.description = $ionicUser.data.data.description;
        document.getElementById("description").style.display = "none";
      }
    }
    console.log("scopeUser");
    console.log(scopeUser);
    return scopeUser;
  };

  $scope.saveData = function() {
    if($ionicAuth.isAuthenticated()) {
      if($scope.userData.name != undefined) {
        $ionicUser.set('name',$scope.userData.name);
      }
      if($scope.userData.username != undefined) {
        $ionicUser.set('username',$scope.userData.username);
      }
      if($scope.userData.location != undefined) {
        $ionicUser.set('location',$scope.userData.location);
      }
      if($scope.userData.description != undefined) {
        $ionicUser.set('description',$scope.userData.description);
      }
      $ionicUser.save();
      console.log($ionicUser);
      alert("succcess!");
    }
  };

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

.controller('AccountsCtrl', function($scope, $ionicDB, Account) {
  $scope.dbConnect = function() {
    $ionicDB.connect();
  };

  $scope.displayUsers = function() {
    var users = $ionicDB.collection("users");
    var test = users.fetch();
    console.log(test);

  };
    
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

.controller('AccountCtrl', function($scope, $stateParams, $ionicDB, Account) {
    $scope.account = Account.get({accountId: $stateParams.accountId});


});