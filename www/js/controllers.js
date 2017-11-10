angular.module('app.controllers', [])
     
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, $ionicSideMenuDelegate) {
    

    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.userId = $ionicUser.details.email.replace('@edel.io', '');
        // $scope.loggedIn = true
      });
    } 
    
    $scope.logout = function(){
        // $scope.loggedIn = false
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
   
.controller('selectLanguageCtrl', ['$scope', '$stateParams', '$ionicSlideBoxDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicSlideBoxDelegate) {
    
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
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };

}])
   
.controller('haveAQuestionCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicPopup', 'FormValidation', 'Questions', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, $ionicPopup, FormValidation, Questions) {

    $scope.data = {
        userId: '99999',
        Qemail: 'test@gmail.com',
        Question: 'I need help finding a job?',
    }
    
    
    
    $scope.sendQuestion = function(){
        
        $scope.errors = []
        $scope.errors.push(FormValidation.validateEmail($scope.data.Qemail));
        $scope.errors.push(FormValidation.validateQuestion($scope.data.Question));
        $scope.errors = $scope.errors.filter(function(n){ return n !== undefined });
        if($scope.errors.length !== 0){
            alert($scope.errors.join("\n\n"));
            return;
        }
        

        Questions.addItem($scope.data.userId, $scope.data.Qemail, $scope.data.Question);

        $ionicPopup.alert({
            title: 'Qustion Sent!',
            template: '<center>Thank you and we will be in touch.</center>'
        });
        
        $scope.data.Qemail = ''
        $scope.data.Question = ''
            
        $state.go('selectLanguage')
    } 

}])
   
.controller('registerCtrl', ['$scope', '$stateParams', '$state', '$ionicUser', '$ionicAuth', '$rootScope', '$ionicLoading', 'Users', 'FormValidation', 'Twilio', 'sha256', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicUser, $ionicAuth, $rootScope, $ionicLoading, Users, FormValidation, Twilio, sha256) {

    $scope.data = {
        city: 'Montréal, QC',
        phone: '4258024392',
        password: 'abcdefghijklmnopqrstuvwxyz',
        phoneHash: '',
        country_code: ''
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
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };
    
    
    var coverage = ["Montréal, QC"];
    
    $scope.errors = []


    $scope.loginRegister = function(){
        $scope.data.phoneHash = sha256.convertToSHA256($scope.data.phone);
        // console.log($scope.data.phoneHash)
        
        if(coverage.indexOf($scope.data.city) === -1){
            $scope.data.msg = "Sorry, looks like we don't support your city yet!"
            $state.go('updates', $scope.data)
        } else {
            
            
            $scope.errors.push(FormValidation.validatePassword($scope.data.password));
            $scope.errors = $scope.errors.filter(function(n){ return n !== undefined });
            if($scope.errors.length !== 0){
                alert($scope.errors.join("\n\n"));
                $scope.errors = []
                return;
            }
            
            Twilio.lookup($scope.data.phone)
    		.success(function (data, status, headers, config) {
    			// Success - do something
                $scope.data.country_code = data.country_code
    			Users.filter($scope.data.phoneHash).then(function(res){
                if(res === null){
                    
                    $scope.data.country_code = data.country_code
                    $scope.data.phoneHash = sha256.convertToSHA256($scope.data.phone);
                    Users.addItem($scope.data)
    
                    $scope.userdata = {
                        email: $scope.data.phoneHash + '@edel.io',
                        password: $scope.data.password,
                        name: $scope.data.country_code + '_' + $scope.data.city
                    }
                    
                    $ionicLoading.show();
                    $scope.signup($scope.userdata);
    
                } else{
                    $scope.errors.push("This phone number is already registered.");
                    alert($scope.errors)
                    $scope.errors = []
                }
            })
		})
		.error(function (data, status, headers, config) {
			// Failure - do something
// 			$ionicLoading.hide();
			$scope.errors.push("Please enter valid phone number (including area/country code)");
            alert($scope.errors)
            $scope.errors = []
		});
	
            
        }
        
        
    }
    
    $scope.signup = function(data){
        $ionicAuth.signup(data).then(function() {
            $ionicAuth.login('basic', data).then(function(){
              	$rootScope.$broadcast('login_change');
              	$state.go('tabsController.compass')
              	$ionicLoading.hide();
            }, function(){
                
            })
        }, function(err) {
            
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'This number is already linked to another device',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.errors.push(error_lookup[err.details[0]]);
            alert($scope.errors)
            $scope.errors = []
        });
    }
    

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicUser', '$ionicAuth', '$rootScope', '$ionicLoading', '$ionicHistory', 'Users', 'FormValidation', 'sha256', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicUser, $ionicAuth, $rootScope, $ionicLoading, $ionicHistory, Users, FormValidation, sha256) {

    $scope.data = {
        phone: '4258024392',
        password: 'abcdefghijklmnopqrstuvwxyz',
        phoneHash: ''
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
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };
    
    
    $scope.errors = []
    
    $scope.login = function(){
        $scope.data.phoneHash = sha256.convertToSHA256($scope.data.phone);
        $scope.credentials = {
            email: $scope.data.phoneHash + '@edel.io',
            password: $scope.data.password
        }
        
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
            
        });
        
        $ionicAuth.login('basic', $scope.credentials).then(function(){
            $rootScope.$broadcast('login_change');
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $state.go('tabsController.compass')
            $ionicLoading.hide();

        }, function(){
            $scope.errors.push("Incorrect phone or passcode.");
            alert($scope.errors)
            $scope.errors = []
            $ionicLoading.hide();
        })

    }
    
    if ($ionicAuth.isAuthenticated()) {
      $ionicUser.load().then(function() {
        $rootScope.$broadcast('login_change');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
    //     // console.log('Logged in!')
        $state.go('tabsController.compass');  
      });
    } 
   
    

}])
   
.controller('compassCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser) {

    if ($ionicAuth.isAuthenticated()) {
            // console.log("Compass")    

    //   // Updated on 1/9/2017 to fix issues with logging
    //   // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        // console.log($scope.user)
        
      });
    }
 
   
}])
   
.controller('directoryCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', '$ionicLoading', 'Directory', 'DistanceMartix', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaGeolocation, $ionicLoading, Directory, DistanceMartix) {

    $scope.directory = Directory.items;
    $scope.params = $stateParams;
    
    $scope.MyLocation = {
        Lat:Infinity,
        Long:Infinity
    };

    $scope.loadDirectory = function(){
        $ionicLoading.show();
        if($scope.params.category === ""){
            $scope.directory = Directory.items;
        } else{
            Directory.filter('category', $scope.params.category).then(function(res){
                $scope.directory = res;  
            });
        }
        $ionicLoading.hide();
    }
    
    $scope.loadDirectory();
    
    // $scope.GetLocation = function() {
    //     $ionicLoading.show();
    //     var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //     $cordovaGeolocation
    //         .getCurrentPosition(posOptions)
    //         .then(function (position) {
    //             $scope.MyLocation.Lat  = position.coords.latitude;
    //             $scope.MyLocation.Long = position.coords.longitude;
                
    //             console.log($scope.MyLocation)
    //         }, function(err) {
    //       // error
    //     });
    // };
    
    // $scope.FilterByLocation = function(){
    //     $ionicLoading.show();


    //     $scope.GetLocation();
        
        
    //     $ionicLoading.hide();
    // }
    
    
    

    // $scope.GetLocation = function() {
    //     $ionicLoading.show();
    //     var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //     $cordovaGeolocation
    //         .getCurrentPosition(posOptions)
    //         .then(function (position) {
    //             $scope.MyLocation.Lat  = position.coords.latitude;
    //             $scope.MyLocation.Long = position.coords.longitude;
                
    //             Directory.items.$loaded()
    //             .then(function(){
    //                 angular.forEach(Directory.items, function(item) {
    //                     var params = {
    //                         origins: $scope.MyLocation.Lat + ',' + $scope.MyLocation.Long,
    //                         destinations: item.address,
    //                     }
                        
    //                     DistanceMartix.getDistance(params).then(function(res){
    //                         item.distanceText = res.text
    //                         item.distance = res.value
                            
    //                         $scope.directory.push(item);
                            
    //                         $scope.directory.sort(function(a, b){
    //                             return a.distance-b.distance
    //                         })
                            
    //                     })
                        
    //                 })
                    
                    
                    
    //             });
                
                
                
    //             $ionicLoading.hide();
    //         }, function(err) {
    //       // error
    //     });
    // };
    
    // $scope.GetLocation();
    


    // $scope.loadDirectory = function(){
    //     if($scope.params.category === ""){
    //         $scope.directory = Directory.items;
    //     } else{
    //         Directory.filter('category', $scope.params.category).then(function(res){
    //             $scope.directory = res;  
    //         });
    //     }
    // }
    
    // $scope.loadDirectory();
    

    
    


}])
   
.controller('updatesCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'Updates', 'FormValidation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, Updates, FormValidation) {
    
    $scope.params = $stateParams

    $scope.data = {
        'email': '',
        'city':  $scope.params.city
    }
    
    $scope.error = ''
    $scope.msg = $scope.params.msg

    $scope.signupUpdates = function(){
        
        if(FormValidation.validateEmail($scope.data.email)){
            $scope.errors.push("Please enter valid email address.");
            alert($scope.errors)
        }{
            Updates.addItem($scope.data.email, $scope.data.city);
            

            $state.go('selectLanguage')   
            
            $ionicPopup.alert({
                title: 'Signed Up!',
                template: "You will now start recieving updates from Compass."
            });
            
            
        }
        
        // if(FormValidation.validateEmail($scope.data.email)){
        //     Updates.addItem($scope.data.email, $scope.data.city);
            
        //     $ionicPopup.alert({
        //         title: 'Thank you!',
        //         template: 'Your response has been recorded.'
        //     });
            
        //     $state.go('selectLangauge')
        // } else{
        //     $scope.error = 'Please enter valid email.'
        // }
    }

}
])
   
.controller('iJustArrivedCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicPopup', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, $ionicPopup, Todos) {

    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        $scope.user.city = $scope.user.name.split("_")[1]
        // console.log($scope.user)
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
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };
    
    $scope.moreInfo = function(link){
        
        $ionicPopup.alert({
                title: 'Refugee Protection Claimant Document (RPCD)',
                template: '<img src="https://firebasestorage.googleapis.com/v0/b/compass-release.appspot.com/o/refugee_id-1.png?alt=media&token=4ee36739-173c-4fdc-af17-0a311c75308f" style="display: block; width: 70%; height: auto; margin-left: auto; margin-right: auto;">'
        });
    }

}])
 