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
        Qemail: '',
        Question: '',
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
        

        Questions.addItem($scope.data.Qemail, $scope.data.Question);

        $ionicPopup.alert({
            title: 'Qustion Sent!',
            template: '<center>Thank you and we will be in touch.</center>'
        });
        
        $scope.data.Qemail = ''
        $scope.data.Question = ''
            
        $state.go('selectLanguage')
    } 

}])

.controller('haveAQuestion2Ctrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicPopup', 'FormValidation', 'Questions', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, $ionicPopup, FormValidation, Questions) {

    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        $scope.user.city = $scope.user.name.split("_")[1]
        // console.log($scope.user)
      });
    }




    $scope.data = {
        Qemail: '',
        Question: '',
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
        
        // console.log($scope.data.Qemail, $scope.data.Question);

        Questions.addItem($scope.data.Qemail, $scope.data.Question);

        $ionicPopup.alert({
            title: 'Qustion Sent!',
            template: '<center>Thank you and we will be in touch.</center>'
        });
        
        $scope.data.Qemail = ''
        $scope.data.Question = ''
            
        $state.go('tabsController.compass')
    } 

}])
   
.controller('registerCtrl', ['$scope', '$stateParams', '$state', '$ionicUser', '$ionicAuth', '$rootScope', '$ionicLoading', 'Users', 'FormValidation', 'Twilio', 'sha256', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicUser, $ionicAuth, $rootScope, $ionicLoading, Users, FormValidation, Twilio, sha256) {

    $scope.data = {
        city: 'Montréal, QC',
        phone: '',
        password: '',
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
        phone: '',
        password: '',
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

.controller('connectionStateCtrl',['$scope','$stateParams','$state', 
function ($scope, $stateParams, $state) {
       $scope.offline = false;
    
        $scope.$on('$cordovaNetwork:offline', function(event, networkState){
           $scope.offline = true;
           $scope.$digest();
         });
         
          window.addEventListener("offline", function(e) {
            $scope.offline = true;
            $scope.$digest();
          }, false);  

          $scope.$on('$cordovaNetwork:online', function(event, networkState){
            $scope.offline = false;
            $scope.$digest();
          });
         
          window.addEventListener("online", function(e) {
            $scope.offline = false;
            $scope.$digest();
          }, false);  
}
])
   
.controller('directoryCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', '$ionicLoading', 'Directory', 'DistanceMartix', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaGeolocation, $ionicLoading, Directory, DistanceMartix) {

    $scope.params = $stateParams;
    
    $scope.MyLocation = {
        Lat:Infinity,
        Long:Infinity
    };
    
    $scope.GetLocation = function(directory, firebaseArray) {
       
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                
                $scope.MyLocation.Lat  = position.coords.latitude;
                $scope.MyLocation.Long = position.coords.longitude;
                
                
                if(firebaseArray == true){
                
                    // ----------------
                    
                    directory.$loaded()
                    .then(function(res){
                        var destinations = []
                        
                        for (i = 0; i < res.length; i++) { 
	                        destinations.push(res[i].address)
                        }
                        // var destinations = res.map(a => a.address)
                        // console.log(destinations)
                        var i,j,tempDist,tempDir, chunk = 25;
                        
                        for (i=0,j=destinations.length; i<j; i+=chunk) {
                            
                            tempDir = res.slice(i,i+chunk)
                            tempDist = destinations.slice(i,i+chunk);
                            
                            $scope.distanceMatrix = {
                                origins: $scope.MyLocation.Lat + ',' + $scope.MyLocation.Long,
                                destinations: tempDist,
                                units: 'imperial'
                            }
                            
                            setTimeout(
                                DistanceMartix.getDistance($scope.distanceMatrix).then(function(resp){
                                    foo = resp.rows[0].elements
                                    
                                    var distText = []
                                    for (i = 0; i < foo.length; i++) { 
	                                    distText.push(foo[i].distance.text)
                                    }
                                    var distValue = []
                                    for (i = 0; i < foo.length; i++) { 
	                                    distText.push(foo[i].distance.value)
                                    }
                                    

                                    k=0
                                    angular.forEach(tempDir,function(item){
                                        item.distanceText = distText[k]
                                        item.distanceValue = distValue[k]
                                        k+=1
                                    })
                                    
                                    tempDir.sort(function(a, b){
                                        return a.distanceValue-b.distanceValue
                                        
                                    })
                                    
                                    $scope.directory = tempDir;
                                    $ionicLoading.hide();
                                    
                                    
                                }),
                            1000);
                            
                            
                            break
                            
                        }
                        
                        
                        
                    })
                    // ------------------
                } else{
                    var directoryArray = Object.keys(directory).map(function(key){return directory[key]})
                    var destinations = []
                        
                    for (i = 0; i < directoryArray.length; i++) {
                        destinations.push(directoryArray[i].address)
                    }

                    var i,j,tempDist,tempDir, chunk = 25;
                    
                    for (i=0,j=destinations.length; i<j; i+=chunk) {
                        
                        tempDir = directoryArray.slice(i,i+chunk)
                        tempDist = destinations.slice(i,i+chunk);
                        

                        $scope.distanceMatrix = {
                            origins: $scope.MyLocation.Lat + ',' + $scope.MyLocation.Long,
                            destinations: tempDist,
                            units: 'imperial'
                        }
                        

                        setTimeout(
                            DistanceMartix.getDistance($scope.distanceMatrix).then(function(resp){
                                foo = resp.rows[0].elements
                                
                                var distText = []
                                for (i = 0; i < foo.length; i++) {
                                    distText.push(foo[i].distance.text)
                                }
                                var distValue = []
                                for (i = 0; i < foo.length; i++) {
                                    distText.push(foo[i].distance.value)
                                } 
        //                         distText = resp.rows[0].elements.map(a => a.distance.text)
        //                         distValue = resp.rows[0].elements.map(a => a.distance.value)
                                    
                                k=0
                                angular.forEach(tempDir,function(item){
                                    item.distanceText = distText[k]
                                    item.distanceValue = distValue[k]
                                    k+=1
                                })
                                    
                                tempDir.sort(function(a, b){
                                    return a.distanceValue-b.distanceValue
                                        
                                })
                                    
                                $scope.directory = tempDir;
                                $ionicLoading.hide();    
                                    
                                    
                            }),
                        1000);
                            
                            
                        break
                        
                    }
                        
                        

                }
        
            }, function(err) {
          // error
        });
        
    };
    
    $scope.loadDirectory = function(){
        
        if($scope.params.category === ""){
            $ionicLoading.show();
            $scope.GetLocation(Directory.items, true);
        } else{
            Directory.filter('category', $scope.params.category).then(function(res){
            // console.log(res)
                $ionicLoading.show();
                $scope.GetLocation(res);
                // $scope.directory = res;  
            });
        }
        
    }
    
    $scope.loadDirectory();
    

       

    
    


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
    
    $scope.moreInfoID = function(link){
        
        $ionicPopup.alert({
                title: 'Refugee Protection Claimant Document (RPCD)',
                template: '<img src="https://firebasestorage.googleapis.com/v0/b/compass-release.appspot.com/o/refugee_id-1.png?alt=media&token=4ee36739-173c-4fdc-af17-0a311c75308f" style="display: block; width: 70%; height: auto; margin-left: auto; margin-right: auto;">'
        });
    }
    
    $scope.moreInfoPraida = function(){
        
        $ionicPopup.alert({
                title: 'PRAIDA',
                template: '<center>PRAIDA is a government office in Montreéal with social workers and other resources you need to bgin your case and integration process.</center>'
        });
    }

    $scope.data = {
        refId : 'no',
        praida: 'no',
        shelter: 'no'
    }
    
    $scope.createGuide = function(){
        $scope.userId = $scope.user.email.replace("@edel.io", "")
        
        if($scope.data.praida !== "yes"){
            Todos.addTodos($scope.userId, "Go to Praida", "ff63a92cda64ab09bd96bd65f7c25d8d", "When you get to PRAIDA you will speak with a social worker, who will give you information about and help you in certain things such as applying welfare, make an appointment with the lawyer, and scheduling a medical exam.\n\n**Your social worker is not a lawyer and is only there to provide guidance through the process.**", null, null, null);
        }
        
        if($scope.data.shelter !== "yes"){
            Todos.addTodos($scope.userId, "Go to YMCA", "3f4ec981cb2bf46fcd302969685e3266", "Hours:\n\nTuesdays from 8:00 AM to 5:00 PM\nWednesdays from 8:00 AM to 5:00 PM\nThursdays from 8:00 AM to 5:00 PM\n", null, null, null);
        }

        $state.go('tabsController.todos')
        
    }

}])


.controller('scheduleMedicalExamCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicPopup', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
          //console.info("Test");
        }
    };

    $scope.setSlider = function(slider){
        $scope.slider.slideTo(slider);
    };


    $scope.data = {
        apptDate: '',
        apptTime: ''
    }

    $scope.data.clinic = {
        name: "",
        address: "",
        hashed : "",
        phone: ""
    }


    $scope.clinics = [

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
        $scope.errors = []

        if($scope.data.clinic.phone.length === 0){
            alert("Select clinic");
            return;
        }
        var phone = $scope.data.clinic.phone;
        var call = "tel:" + phone;
        window.location = call;
    }


    
    $scope.setReminder = function(){


        $scope.errors = []

        if($scope.data.clinic.phone.length === 0){
            $scope.errors.push("Go back and select clinic");
        }

        if($scope.data.apptDate.length === 0){
            $scope.errors.push("Please enter valid appointment date");
        }

        if($scope.data.apptTime.length === 0){
            $scope.errors.push("Please enter valid appointment time");
        }

        if($scope.errors.length !== 0){
            alert($scope.errors.join("\n\n"));
            return;
        }

        $scope.userId = $scope.user.email.replace("@edel.io", "")
        
        var year = $scope.data.apptDate.getFullYear();
        var month = $scope.data.apptDate.getMonth();
        var day = $scope.data.apptDate.getDate();
        var hour = $scope.data.apptTime.getHours();
        var min = $scope.data.apptTime.getMinutes();
        var datetime = new Date(year, month, day, hour, min);
        
        if($scope.data.apptDate !== ''){
            if($scope.data.apptTime !== ''){
                Todos.addTodos($scope.userId, "Medical Exam", $scope.data.clinic.hashed, datetime + "\n\nApproximately 30 days after your medical exam, you will eligible to apply for your work permit.", datetime, null, null);
            }
        }

        $state.go('tabsController.todos')
    //     // Todos.addTodos("user", "title", "name", "info", "datetime", "prereq", "gtd");
    //     // console.log('Test')
    }

}])

.controller('findHousingCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', '$ionicPopup', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, $ionicPopup, Todos) {



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

.controller('checkAppStatusCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
    

    

}])
   
.controller('informationCtrl', ['$scope', '$stateParams', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Directory) {
    
    // console.log($stateParams.item)
    $scope.item = Directory.items[Directory.items.$indexFor($stateParams.item)];
    
    $scope.call = function(phone){
        var call = "tel:" + phone;
        window.location = call;
    }
    
}])

.controller('informationTodoTabCtrl', ['$scope', '$stateParams', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Directory) {
    
    
    $scope.item = Directory.items[Directory.items.$indexFor($stateParams.item)];
    // console.log($scope.item)
    $scope.call = function(phone){
        var call = "tel:" + phone;
        window.location = call;
    }
    
}])
   
.controller('mapCtrl', ['$scope', '$stateParams', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Directory) {

    $scope.item = Directory.items[Directory.items.$indexFor($stateParams.item)];
    
    $scope.openMaps = function () {
        var link = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent($scope.item.name) + encodeURIComponent($scope.item.address)
        window.location = link
    }

}])

.controller('mapTodoTabCtrl', ['$scope', '$stateParams', 'Directory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Directory) {

    $scope.item = Directory.items[Directory.items.$indexFor($stateParams.item)];
    
    $scope.openMaps = function () {
        var link = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent($scope.item.name) + encodeURIComponent($scope.item.address)
        window.location = link
    }

}])
   
.controller('todosCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        $scope.userId = $scope.user.email.replace("@edel.io", "")
        Todos.filter($scope.userId).then(function(res){
            if(res !== null){
                
                var unfinishedItems = 0
                
                angular.forEach(res,function(item){
                    if(item.finished === false){
                        unfinishedItems += 1
                    }
                })
                
                if(unfinishedItems === 0){
                    $scope.data.noItems = true
                }
                
                $scope.data.items = res;
                $scope.keys = Object.keys($scope.data.items)
                for(i = 0; i < $scope.keys.length; i++){
                    $scope.data.items[$scope.keys[i]].key = $scope.keys[i]
             }
            } else{
                $scope.data.noItems = true
            }
            
        });

        
      });
    }
    
    $scope.data = {
       items: [],
       noItems: false
    }
    
    $scope.gotoCompleted = function(){
        $state.go('tabsController.completedTodos')

    }


   
   
   
}])


.controller('completedTodosCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {
    
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function(user) {
        $scope.user = $ionicUser.details
        $scope.userId = $scope.user.email.replace("@edel.io", "")
        Todos.filter($scope.userId).then(function(res){
            if(res !== null){
                
                var finishedItems = 0
                
                angular.forEach(res,function(item){
                    if(item.finished === true){
                        finishedItems += 1
                    }
                })
                
                if(finishedItems === 0){
                    $scope.data.noItems = true
                }
                
                $scope.data.items = res;
                $scope.keys = Object.keys($scope.data.items)
                for(i = 0; i < $scope.keys.length; i++){
                    $scope.data.items[$scope.keys[i]].key = $scope.keys[i]
             }
            } else{
                $scope.data.noItems = true
            }
            
        });

        
      });
    }
    
    $scope.data = {
       items: [],
       noItems: false
    }
    
   
   
   
}])


.controller('todoInfoCtrl', ['$scope', '$stateParams', '$state', '$ionicAuth', '$ionicUser', 'Todos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicAuth, $ionicUser, Todos) {
    

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
 