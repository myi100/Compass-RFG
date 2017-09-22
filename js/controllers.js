angular.module('app.controllers', [])
  
.controller('compassCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, $ionicModal) {
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        // console.log($scope.user)
        
      });
    }
 
    $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" +
    "<ion-header-bar class='bar-royal'>" +
      "<h1 class='title'>Contact Us Directly</h1>" +
      '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
    "</ion-header-bar>" +
    "<ion-content class='padding'>" +
    //   "<label class='item item-input'><input type='text' placeholder='Title' ng-model='data.title' /></label>" +
    //   "<button ng-click='addItem()' class='button button-royall button-block'>Submit</button>" +
    "</ion-content>" +
  "</ion-modal-view>", {
        scope: $scope,
        animation: 'slide-in-up'
    })
    
    $scope.showModal = function(){
        $scope.modal.show();
    }
    
    $scope.closeModal = function(){
        $scope.modal.hide();
    }
}])
   
.controller('directoryCtrl', ['$scope', '$stateParams', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Directory) {

    $scope.directory = [];
    $scope.params = $stateParams;
    
    // console.log($scope.params)

    $scope.loadDirectory = function(){
        if($scope.params.category === ""){
            $scope.directory = Directory.items;
        } else{
            Directory.filter('category', $scope.params.category).then(function(res){
                $scope.directory = res;  
            });
        }
    }
    
    $scope.loadDirectory();


}])
   
.controller('informationCtrl', ['$scope', '$stateParams', '$state', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Directory) {
    
    
    $scope.item = Directory.items[Directory.items.$indexFor($stateParams.item)];
    // [Directory.items.$indexFor($stateParams.item)];
    // console.log($scope.item.category);
    $scope.call = function(phone){
        var call = "tel:" + phone;
        // console.log(call);
        window.location = call;
    }
    

}])
   
.controller('mapCtrl', ['$scope', '$stateParams', '$ionicModal', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, Directory) {

    $scope.item = Directory.items[Directory.items.$indexFor($stateParams.item)];
    // console.log($scope.item);
    // $scope.data = {
    //     name: $scope.item.name,
    //     address: $scope.item.address
    // }
//     $scope.travelmode = 'walking';
    
//     $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" +
//     "<ion-header-bar class='bar-stable'>" +
//       "<h1 class='title'>Directions</h1>" +
//       '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
//     "</ion-header-bar>" +
//     "<ion-content>" +
    
//         '<ion-list class="manual-list-fullwidth wrapping-list">' +
//           '<ion-item>To: {{address}}' +
//           '</ion-item>' +
//           '<ion-item class="item-divider">Travel Mode</ion-item>' +
//             '<ion-radio name="routeType" ng-model="travelmode" ng-value="&quot;transit&quot;">Metro</ion-radio>' +
//             '<ion-radio name="routeType" ng-model="travelmode" ng-value="&quot;walking&quot;">Walk</ion-radio>' +
//             '<ion-radio name="routeType" ng-model="travelmode" ng-value="&quot;driving&quot;">Driving</ion-radio>' +
//           '<ion-item class="item-divider"> </ion-item>' +
//         '</ion-list>' +
//         '<div style="margin-right:-20px;">' +
//           '<button style="left:-10px;" ng-click="openMaps()" class="button button-positive button-full">Open in Google Maps</button>' +
//         '</div>' +
//   "</ion-modal-view>", {
//         scope: $scope,
//         animation: 'slide-in-up'
//     })
    
//     $scope.showModal = function(){
//         $scope.modal.show();
//     }
    
//     $scope.closeModal = function(){
//         $scope.modal.hide();
//     }
    
    $scope.openMaps = function () {
        var link = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent($scope.item.name) + encodeURIComponent($scope.item.address)
        
        // '&travelmode=' + $scope.travelmode;
        window.location = link;
        // console.log(link);
    }
}])
   
.controller('todosCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {
   
   $scope.data = {
       items: [],
       noItems: false
   }
   
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.userId = $ionicUser.details.email.replace("@edel.io", "");
        
        Todos.filter($scope.userId).then(function(res){
            $scope.data.items = res;
            $scope.keys = Object.keys($scope.data.items)
             for(i = 0; i < $scope.keys.length; i++){
                 $scope.data.items[$scope.keys[i]].key = $scope.keys[i]
             }
        });
        
        // $scope.data.items.$loaded().then(function(res) {
        //   if(res.length === 0){
        //       $scope.data.noItems = true
        //   } else {
        //       $scope.data.noItems = false
        //   }
        // });
        
      });
    }
    
    
    $scope.gotoCompleted = function(){
        $state.go('tabsController.completedTodos')

    }
    

   
    
}])
   
.controller('completedTodosCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, Todos) {
   
   $scope.data = {
       items: [],
       noItems: false
   }
   
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.userId = $ionicUser.details.email.replace("@edel.io", "");
        
        Todos.filter($scope.userId).then(function(res){
            $scope.data.items = res;
            $scope.keys = Object.keys($scope.data.items)
             for(i = 0; i < $scope.keys.length; i++){
                 $scope.data.items[$scope.keys[i]].key = $scope.keys[i]
             }
        });
        
        // $scope.data.items.$loaded().then(function(res) {
        //   if(res.length === 0){
        //       $scope.data.noItems = true
        //   } else {
        //       $scope.data.noItems = false
        //   }
        // });
        
      });
    }
    
    
    // 4258024389
    

   
    
}])
   
.controller('todoItemCtrl', ['$scope', '$stateParams', '$state', 'Todos', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Todos, Directory) {
    
    $scope.item = Todos.items[Todos.items.$indexFor($stateParams.item)];

    $scope.toggleFinished = function(){
                console.log($scope.item)

        if ($scope.item.finished){
            Todos.setFinished($scope.item, false);
        }else{
            Todos.setFinished($scope.item, true);
        }
        console.log($scope.item)
    }
    
    
}])
      
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, $ionicSideMenuDelegate) {
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.userId = $ionicUser.details.email.replace('@edel.io', '');
        // console.log("Menu: " + $scope.userId);
      });
    }
    $scope.logout = function(){
        $ionicAuth.logout();
      	// Updated on 1/9/2017 to make sure the menu closes when
        // you log out so that it's closed if you log back in.
     	$ionicSideMenuDelegate.toggleLeft(false);
        $state.go('selectLanguage');
    }
    
    $scope.emailSupport = function(){
        var email = "mailto:support@edel.io";
        window.location = email;
    }
    
}])
   
.controller('selectLanguageCtrl', ['$scope', '$stateParams', '$ionicSlideBoxDelegate', '$cordovaNetwork', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicSlideBoxDelegate, $cordovaNetwork, $ionicPopup) {
    
    document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()
    

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;
      $ionicPopup.confirm({
            title: "Internet disconnected!",
            content: "Please check your connection before moving on"
        })
        .then(function(result){
            if(!result){
                ionic.Platform.exitApp();
            }
        });
    })

  }, false);
    // console.log("checking network", $cordovaNetwork);

    // if(!navigator.onLine){
    //     $ionicPopup.confirm({
    //         title: "Internet disconnected!",
    //         content: "Please check your connection before moving on"
    //     })
    //     .then(function(result){
    //         if(!result){
    //             ionic.Platform.exitApp();
    //         }
    //     });
    // }
    
    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        pagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('needInternetConnectionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('welcomeCtrl', ['$scope', '$stateParams', '$ionicSlideBoxDelegate', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicPopup) {
    
    $scope.showInfo = function(link){
        
        $ionicPopup.alert({
                title: 'Source',
                template: link
        });
    }
    
    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        pagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('registerCtrl', ['$scope', '$stateParams', '$state', '$ionicUser', '$ionicAuth', '$rootScope', 'Users', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicUser, $ionicAuth, $rootScope, Users) {

    $scope.data = {
        city: 'Montréal, QC',
        phone: '',
        share: $stateParams.share,
        passcode: ''
    }
    
    var coverage = ["Montréal, QC"];

    $scope.loginRegister = function(){
        $scope.error = []
        if(coverage.indexOf($scope.data.city) === -1){
            $scope.data.msg = "Sorry, looks like we don't support your city yet!"
            $state.go('updates', $scope.data)
        } else {
            
            if($scope.data.phone === "" || $scope.data.phone.length < 5){
                $scope.error.push("Enter valid phone number!")
                // += '\nEnter valid phone number!\n';
            }
            
            if($scope.data.share === "" || $scope.data.share.length < 5){
                $scope.error.push("Enter valid share code!")
            }
            $scope.error = Array.from(new Set($scope.error));
            
            if($scope.error.length === 0){
                // Does User Exist
                Users.filter($scope.data.phone).then(function(res){
                    if(res === null){
                        // Is Share Code Valid
                        Users.share.orderByChild("phone").equalTo($scope.data.share).once("value", function(snapshot) {
                            if(snapshot.val() === null){
                                $scope.error.push("Enter valid share code!")
                            } else{
                                Users.addItem($scope.data)
                                
                                $scope.userdata = {
                                    email: $scope.data.phone + '@edel.io',
                                    password: $scope.data.passcode + '@edel.io',
                                    name: $scope.data.city
                                }            
                                
                                $scope.signup($scope.userdata);
                                
                            }
                        });   
                        

                        
                    }
                    
                    try{
                        phone_linked = Object.keys(res).length; 
                        if(phone_linked > 0){
                            $scope.error.push('This number is already registered.')
                        } else{
                            /// Is Share Code Valid
                        Users.share.orderByChild("phone").equalTo($scope.data.share).once("value", function(snapshot) {
                            if(snapshot.val() === null){
                                $scope.error.push("Enter valid share code!")
                            } else{
                                Users.addItem($scope.data)
                                
                                $scope.userdata = {
                                    email: $scope.data.phone + '@edel.io',
                                    password: $scope.data.share + '@edel.io',
                                    name: $scope.data.city

                                }
                                
                                $scope.signup($scope.userdata);
                                
                                

                            }
                        });   
                        

                        }
                    } catch(e){}
                    
                    
                });
            

            
                // Sign Up User
            }
        }
    }
    
    $scope.signup = function(data){
        $ionicAuth.signup(data).then(function() {
            $ionicAuth.login('basic', data).then(function(){
              	$rootScope.$broadcast('login_change');
              	console.log('Success!')
            //   	$state.go('tabsController.compass ', {}, { reload: true });
              	$state.go('tabsController.compass')
            }, function(){
              	console.log('Failed!')
            })
        }, function(err) {
            
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'This number is already linked to another device',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.error = error_lookup[err.details[0]];
        });
    }
    
    $scope.gotoAccessCode = function(){
        $state.go('accessCode');
    }
    

    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        plagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', '$ionicHistory', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, $ionicHistory, $rootScope) {

    $scope.data = {
        'phone': '',
        'passcode': ''
    }
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function() {
        $rootScope.$broadcast('login_change');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        // console.log('Logged in!')
        $state.go('tabsController.compass');  
      });
    }
    
    $scope.login = function(){
        $scope.credentials = {
            email: $scope.data.phone + '@edel.io',
            password: $scope.data.passcode + '@edel.io'
        }
        
        $ionicAuth.login('basic', $scope.credentials).then(function(){
            $rootScope.$broadcast('login_change');
            $state.go('tabsController.compass');  
        }, function(){
            $scope.error = [];
            $scope.error.push("Incorrect phone or passcode.");
            $scope.error = Array.from(new Set($scope.error));
        })
        
        // $scope.error = [];
        // $scope.error.push('An unknown error occurred.');
        // $scope.error = Array.from(new Set($scope.error));   
    }
    
    // $scope.login = function(){
    //     $scope.credentials = {
    //         email: $scope.data.phone + '@edel.io',
    //         password: $scope.data.passcode + 'edel.io'
    //     }
        
    //     // $ionicAuth.login('basic', $scope.credentials).then(function(){
    //     //     $state.go('tabsController.compass');
    //     // }, function(){
    //     //     console.log('Failed')
    //     //     // $scope.error = 'Error logging in.';
    //     // })

    //     $ionicAuth.login('basic', $scope.credentials).then(function(){
    //       	$rootScope.$broadcast('login_change');
    //         $state.go('tabsController.compass');  
    //     }, function(){
    //         $scope.error = [];
    //         $scope.error.push("Incorrect phone or passcode.");
    //         $scope.error = Array.from(new Set($scope.error));
    //     })
    // }
    
    // // $scope.login();
    
    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        pagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };
}])
   
.controller('accessCodeCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'Users', 'Updates', 'Utilities', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, Users, Updates, Utilities) {
    
    $scope.data = {
        share: ''
    }
    
    $scope.error = ''
    // 
    
    $scope.checkAccessCode = function(){
        
        Users.share.orderByChild("phone").equalTo($scope.data.share).once("value", function(snapshot) {
              if(snapshot.val() === null){
                  $scope.error = "Enter valid share code!"
              } else{
                  
                  $state.go('register', $scope.data)
                  
                //   Users.addItem($scope.data)
                  
                //   $scope.userdata = {
                //       email: $scope.data.phone + '@edel.io',
                //       password: $scope.data.share + '@edel.io',
                //       name: $scope.data.city
                //   }
            }
        });      
    }
    

}
])
   
.controller('updatesCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'Updates', 'Utilities', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, Updates, Utilities) {
    
    $scope.params = $stateParams

    $scope.data = {
        'email': '',
        'city':  $scope.params.city
    }
    
    $scope.error = ''
    $scope.msg = $scope.params.msg

    $scope.signupUpdates = function(){
        
        if(Utilities.validateEmail($scope.data.email)){
            Updates.addItem($scope.data.email, $scope.data.city, $stateParams.share);
            
            $ionicPopup.alert({
                title: 'Thank you!',
                template: 'Your response has been recorded.'
            });
            
            $state.go('needInternetConnection')
        } else{
            $scope.error = 'Please enter valid email.'
        }
    }

}
])
   
.controller('iJustArrivedCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {

    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        // console.log($scope.user)
        
      });
    }
    
    $scope.data = {
        refId : 'idk',
        apptDate : '',
        apptTime : '',
        apptIdk : 'idk',
        praida: 'idk',
        shelter: 'no'
    }
    
    
    
    $scope.createGuide = function(){
        var user = $scope.user.email.replace("@edel.io", "") 

        if($scope.data.praida !== "yes"){
            Todos.addTodos(user, "Go to Praida", "ff63a92cda64ab09bd96bd65f7c25d8d", "When you get to PRAIDA you will speak with a social worker, who will give you information about and help you in certain things such as applying welfare, make an appointment with the lawyer, and scheduling a medical exam.\n\n**Your social worker is not a lawyer and is only there to provide guidance through the process.**", null, null, null);
        }
        
        if($scope.data.shelter !== "yes"){
            Todos.addTodos(user, "Go to YMCA", "3f4ec981cb2bf46fcd302969685e3266", "Hours:\n\nTuesdays from 8:00 AM to 5:00 PM\nWednesdays from 8:00 AM to 5:00 PM\nThursdays from 8:00 AM to 5:00 PM\n", null, null, null);
        }
        
        $state.go('tabsController.todos')
        // Todos.addTodos("user", "title", "name", "info", "datetime", "prereq", "gtd");
        // console.log('Test')
    }
    
    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
    
    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        pagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('scheduleMedicalExamCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {

    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        // console.log($scope.user)
        
      });
    }
    
    $scope.data = {
        apptDate: '',
        apptTime: ''
    }
    
    
    $scope.setReminder = function(){
        var user = $scope.user.email.replace("@edel.io", "")
        
        var year = $scope.data.apptDate.getFullYear();
        var month = $scope.data.apptDate.getMonth();
        var day = $scope.data.apptDate.getDate();
        var hour = $scope.data.apptTime.getHours();
        var min = $scope.data.apptTime.getMinutes();
        var datetime = new Date(year, month, day, hour, min);
        
        if($scope.data.apptDate !== ''){
            if($scope.data.apptTime !== ''){
                Todos.addTodos(user, "Medical Exam", $scope.data.clinic.hashed, datetime + "\n\nBy law, you have to have a medical exam within 5 days of your entry into Canada. Approximately 30 days after your medical exam, you will eligible to apply for your work permit.", datetime, null, null);
            }
        }

        $state.go('tabsController.todos')
        // Todos.addTodos("user", "title", "name", "info", "datetime", "prereq", "gtd");
        // console.log('Test')
    }
    
    $scope.clinics = [
        {
            'name': "Clinique médicale Luso",
            "hashed" : "03aa882e580d2c15fd42f4a05dc4dc01",
            'address': "1 Avenue du Mont-Royal E Montréal, QC H2T 1N4",
            'phone': '+15148492391'
        },
        {
            'name': "Clinique médicale Luso",
            "hashed" : "03aa882e580d2c15fd42f4a05dc4dc01",
            'address': "1 Avenue du Mont-Royal E Montréal, QC H2T 1N4",
            'phone': '+15148492391'
        },
        {
            'name': "Clinique de Medecine Industrielle et Preventive deu Quebec CMIPA",
            'address': "1665 Rue Sainte-Catherine O Montréal, QC H3H 1L9",
            "hashed" : "78e867dd79ec83e99a3669a44540ce25",
            'phone': '+15149310801'
        },
        {
            'name': "Medisys Corporate Health",
            'address': "500 Rue Sherbrooke Ouest Montréal, QC H3A",
            "hashed" : "a64917fc58635d59914f85235a579686",
            'phone': '+15144992772'
        },
        {
            'name': "Yael Abikhzer",
            'address': "5950 Chemin de la Côte-des-Neiges Montréal, QC H3S",
            "hashed" : "c4263570f299d5ab70bbeae978c6a559",
            'phone': '+15147330987'
        },       
        {
            'name': "Polyclinique Maisonneuve Rosemont",
            'address': "5345 Assumption Blvd Montreal, QC H1T 4B3",
            "hashed" : "ff0c9bb36b5fcbac2a7708c23b8df4e0",
            'phone': '+15142672857'
        }
    ]
    
    $scope.call = function(){
        var phone = $scope.data.clinic.phone;
        var call = "tel:" + phone;
        // console.log(call);
        window.location = call;
    }
    
    
    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
    
    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        pagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('findHousingCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {

    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        // console.log($scope.user)
        
      });
    }
    
    $scope.data = {
        bedrooms: '',
        rent: '',
        share: ''
    }
    
    
    
    $scope.createGuide = function(){
        if($scope.data.refId !== 'yes'){
            
        }
        // Todos.addTodos("user", "title", "name", "info", "datetime", "prereq", "gtd");
        // console.log('Test')
    }
    
    $scope.clinics = [
        {
            'name': "Clinique médicale Luso",
            "hashed" : "03aa882e580d2c15fd42f4a05dc4dc01",
            'address': "1 Avenue du Mont-Royal E Montréal, QC H2T 1N4",
            'phone': '+15148492391'
        },
        {
            'name': "Clinique médicale Luso",
            "hashed" : "03aa882e580d2c15fd42f4a05dc4dc01",
            'address': "1 Avenue du Mont-Royal E Montréal, QC H2T 1N4",
            'phone': '+15148492391'
        },
        {
            'name': "Clinique de Medecine Industrielle et Preventive deu Quebec CMIPA",
            'address': "1665 Rue Sainte-Catherine O Montréal, QC H3H 1L9",
            "hashed" : "78e867dd79ec83e99a3669a44540ce25",
            'phone': '+15149310801'
        },
        {
            'name': "Medisys Corporate Health",
            'address': "500 Rue Sherbrooke Ouest Montréal, QC H3A",
            "hashed" : "a64917fc58635d59914f85235a579686",
            'phone': '+15144992772'
        },
        {
            'name': "Yael Abikhzer",
            'address': "5950 Chemin de la Côte-des-Neiges Montréal, QC H3S",
            "hashed" : "c4263570f299d5ab70bbeae978c6a559",
            'phone': '+15147330987'
        },       
        {
            'name': "Polyclinique Maisonneuve Rosemont",
            'address': "5345 Assumption Blvd Montreal, QC H1T 4B3",
            "hashed" : "ff0c9bb36b5fcbac2a7708c23b8df4e0",
            'phone': '+15142672857'
        }
    ]
    
    $scope.call = function(){
        var phone = $scope.data.clinic.phone;
        var call = "tel:" + phone;
        // console.log(call);
        window.location = call;
    }
    
    $scope.convertRooms = function(b){
        if(b === 1){
            return 1.5;
        } else if(b === 2){
            return 4.5
        } else if(b === 3){
            return 5.5
        } else if(b === 4){
            return 6.5
        } else if(b === 5){
            return 7.5
        } else if(b === 6){
            return 8.5
        } else if(b === 7){
            return 9.5
        }        
    }
    
    $scope.openKijijji = function(){
        var convertedRooms = $scope.convertRooms(Number($scope.data.bedrooms));
        // http://www.kijiji.ca/b-immobilier/grand-montreal/1.5/k0c34l80002?price=__350
        var link = "http://www.kijiji.ca/b-immobilier/grand-montreal/" + convertedRooms + '/k0c34l80002?price=__' + $scope.data.rent;
        // console.log(link)
        window.open(link, '_system');
        // window.location = link;
    }
    
    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
    
    $scope.activeIndex = 0;
    
    $scope.sliderOptions = {
        pagination: false,
        effect: 'slide',
        initialSlide: 0,
        onInit: function(slider){
          $scope.slider = slider;
        },
        onSlideChangeEnd: function(slider){
          $scope.activeIndex = slider.activeIndex;     
          $scope.$apply();
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('findBuyEssentialsCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

    $scope.findEssentials = function(){
        var params = {
            category: 'Essentials'
        }
        
        $state.go('tabsController.directory', params);
    }
    

    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
}])
   
.controller('studyFrenchOrEnglishCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

    $scope.study = function(){
        var params = {
            category: 'Education'
        }
        
        $state.go('tabsController.directory', params);
    }

    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
}])
   
.controller('checkApplicationCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {


    $scope.checkRefugee = function(){
        var link = "http://www.cic.gc.ca/english/my_application/status.asp?s=8";
        window.open(link, '_system');
        // window.location = link;
    }

    $scope.checkWork = function(){
        var link = "http://www.cic.gc.ca/english/my_application/status.asp?s=5";
        window.open(link, '_system');
        // window.location = link;
    }   
    
    $scope.checkStudy = function(){
        var link = "http://www.cic.gc.ca/english/my_application/status.asp?s=6";
        window.open(link, '_system');
        // window.location = link;
    }    
    


    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
}])
   
.controller('shareCompassCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser) {

    $scope.userId = ''
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.userId = $ionicUser.details.email.replace('@edel.io', '');
      });
    }
    
    $scope.shareEmail = function(){
        var email = "mailto:?subject=Compass: Your Virtual Advocate (App)&body=Compass is a simple tool to help you figure out the asylum seeking process. Use this share code: " + $scope.userId;
        window.location = email;
    }
    
    // <br><br> You can download the application for <a href='#'>iPhone</a> or <a href='#'>Android</a>.
    $scope.shareSms = function(){
       var sms = "sms:&body=Compass is a simple tool to help you figure out the asylum seeking process. Use this share code: " + $scope.userId;
        window.location = sms; 
        
    }
    
    
    $scope.gotoCompass = function(){
        $state.go('tabsController.compass')
    }
}])
   
.controller('geolocationCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', function ($scope, $stateParams, $cordovaGeolocation) {

    $scope.MyLocation = {
        Lat:Infinity,
        Long:Infinity
    };

    $scope.GetLocation = function() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.MyLocation.Lat  = position.coords.latitude;
                $scope.MyLocation.Long = position.coords.longitude;
            }, function(err) {
          // error
        });
    };
}])
 