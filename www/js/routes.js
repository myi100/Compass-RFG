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

  .state('tabsController.haveAQuestion2', {
    url: '/page9',
    views: {
      'tab1': {
        templateUrl: 'templates/haveAQuestion2.html',
        controller: 'haveAQuestion2Ctrl'
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

  .state('tabsController.scheduleMedicalExam', {
    url: '/scheduleMedicalExam',
    views: {
      'tab1': {
        templateUrl: 'templates/scheduleMedicalExam.html',
        controller: 'scheduleMedicalExamCtrl'
      }
    }
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

  .state('tabsController.checkAppStatus', {
    url: '/checkAppStatus',
    views: {
      'tab1': {
        templateUrl: 'templates/checkAppStatus.html',
        controller: 'checkAppStatusCtrl'
      }
    }
  })

  .state('tabsController.information', {
    url: '/page15',
	params: {
		item: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/information.html',
        controller: 'informationCtrl'
      }
    }
  })

  .state('tabsController.map', {
    url: '/page16',
	params: {
		item: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('tabsController.todos', {
    url: '/page17',
    views: {
      'tab3': {
        templateUrl: 'templates/todos.html',
        controller: 'todosCtrl'
      }
    }
  })

  .state('tabsController.completedTodos', {
    url: '/page18 ',
    views: {
      'tab3': {
        templateUrl: 'templates/completedTodos.html',
        controller: 'completedTodosCtrl'
      }
    }
  })

  .state('tabsController.todoInfo', {
    url: '/page19 ',
    params: {
    item: ""    
    },
    views: {
      'tab3': {
        templateUrl: 'templates/todoInfo.html',
        controller: 'todoInfoCtrl'
      }
    }
  })

.state('tabsController.informationTodoTab', {
    url: '/page20',
  params: {
    item: ""    
},
    views: {
      'tab3': {
        templateUrl: 'templates/informationTodoTab.html',
        controller: 'informationTodoTabCtrl'
      }
    }
  })

.state('tabsController.mapTodoTab', {
    url: '/page21',
  params: {
    item: ""    
},
    views: {
      'tab3': {
        templateUrl: 'templates/mapTodoTab.html',
        controller: 'mapTodoTabCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/language')


});