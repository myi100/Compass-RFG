/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('utilities', [])

.service('FormValidation', ['$http', function($http){

    var ret = {
        validateEmail: function(email){
            
            var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            
            if (!emailRegex.test(email)){
                return("Please enter valid email address.")
            }
            
            
            
        },
        
        validatePassword: function(field){
            if(field.length < 5){
                return("Password must be atleast 6 characters.")
            }
            
            
        },
        
        validateQuestion: function(field){
            if(field.length < 10){
                return("Please enter valid question.")
            }
            
        },
        
    }

    return ret;

}]);


/* Ex.: 

.service('BlankService', [function(){

}]);

*/