angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.compass', {
    url: '/compass',
    views: {
      'tab1': {
        templateUrl: 'templates/compass.html',
        controller: 'compassCtrl'
      }
    }
  })

  .state('tabsController.directory', {
    url: '/directory',
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

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.information'
      2) Using $state.go programatically:
        $state.go('tabsController.information');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/information
      /page1/tab3/information
  */
  .state('tabsController.information', {
    url: '/information',
	params: {
		item: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/information.html',
        controller: 'informationCtrl'
      },
      'tab3': {
        templateUrl: 'templates/information.html',
        controller: 'informationCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.map'
      2) Using $state.go programatically:
        $state.go('tabsController.map');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/map
      /page1/tab3/map
  */
  .state('tabsController.map', {
    url: '/map',
	params: {
		item: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      },
      'tab3': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('tabsController.todos', {
    url: '/todos',
    views: {
      'tab3': {
        templateUrl: 'templates/todos.html',
        controller: 'todosCtrl'
      }
    }
  })

  .state('tabsController.completedTodos', {
    url: '/completed',
    views: {
      'tab3': {
        templateUrl: 'templates/completedTodos.html',
        controller: 'completedTodosCtrl'
      }
    }
  })

  .state('tabsController.todoItem', {
    url: '/todoitem',
	params: {
		item: ""		
},
    views: {
      'tab3': {
        templateUrl: 'templates/todoItem.html',
        controller: 'todoItemCtrl'
      }
    }
  })

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

  .state('needInternetConnection', {
    url: '/noConnetion',
    templateUrl: 'templates/needInternetConnection.html',
    controller: 'needInternetConnectionCtrl'
  })

  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'welcomeCtrl'
  })

  .state('register', {
    url: '/register',
	params: {
		city: "",
		phone: "",
		share: ""		
},
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('login', {
    url: '/login',
	params: {
		city: "",
		phone: "",
		share: ""		
},
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('accessCode', {
    url: '/access',
	params: {
		city: "",
		phone: "",
		share: "",
		msg: ""		
},
    templateUrl: 'templates/accessCode.html',
    controller: 'accessCodeCtrl'
  })

  .state('updates', {
    url: '/updates',
	params: {
		city: "",
		phone: "",
		share: "",
		msg: ""		
},
    templateUrl: 'templates/updates.html',
    controller: 'updatesCtrl'
  })

  .state('iJustArrived', {
    url: '/iJustArrived',
    templateUrl: 'templates/iJustArrived.html',
    controller: 'iJustArrivedCtrl'
  })

  .state('scheduleMedicalExam', {
    url: '/scheduleMedicalExam',
    templateUrl: 'templates/scheduleMedicalExam.html',
    controller: 'scheduleMedicalExamCtrl'
  })

  .state('tabsController.findHousing', {
    url: '/findHousing',
    views: {
      'tab1': {
        templateUrl: 'templates/findHousing.html',
        controller: 'findHousingCtrl'
      }
    }
  })

  .state('tabsController.findBuyEssentials', {
    url: '/findEssentials',
    views: {
      'tab1': {
        templateUrl: 'templates/findBuyEssentials.html',
        controller: 'findBuyEssentialsCtrl'
      }
    }
  })

  .state('tabsController.studyFrenchOrEnglish', {
    url: '/study',
    views: {
      'tab1': {
        templateUrl: 'templates/studyFrenchOrEnglish.html',
        controller: 'studyFrenchOrEnglishCtrl'
      }
    }
  })

  .state('checkApplication', {
    url: '/check',
    templateUrl: 'templates/checkApplication.html',
    controller: 'checkApplicationCtrl'
  })

  .state('shareCompass', {
    url: '/share',
    templateUrl: 'templates/shareCompass.html',
    controller: 'shareCompassCtrl'
  })

  .state('geolocation', {
    url: '/page24',
    templateUrl: 'templates/geolocation.html',
    controller: 'geolocationCtrl'
  })

$urlRouterProvider.otherwise('/check')


});