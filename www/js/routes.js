angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('selectLanguage', {
    url: '/language',
    templateUrl: 'templates/selectLanguage.html',
    controller: 'selectLanguageCtrl'
  })

  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'welcomeCtrl'
  })

  .state('haveAQuestion', {
    url: '/page27',
    templateUrl: 'templates/haveAQuestion.html',
    controller: 'haveAQuestionCtrl'
  })

  .state('register', {
    url: '/page7',
	params: {
		city: "",
		phone: ""		
},
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('login', {
    url: '/page9',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.compass', {
    url: '/page8',
    views: {
      'tab1': {
        templateUrl: 'templates/compass.html',
        controller: 'compassCtrl'
      }
    }
  })

  .state('tabsController.directory', {
    url: '/page14',
	params: {
		category: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/directory.html',
        controller: 'directoryCtrl'
      }
    }
  })

  .state('updates', {
    url: '/page10',
	params: {
		city: "",
		phoneHash: "",
		msg: ""		
},
    templateUrl: 'templates/updates.html',
    controller: 'updatesCtrl'
  })

  .state('tabsController.iJustArrived', {
    url: '/page11',
    views: {
      'tab1': {
        templateUrl: 'templates/iJustArrived.html',
        controller: 'iJustArrivedCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/language')


});