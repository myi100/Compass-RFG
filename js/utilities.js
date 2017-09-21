/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('utilities', [])

.service('Utilities', ['$http', function($http){

    var ret = {
        validateEmail: function(email){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
        return re.test(email);
        // console.log(email)
        },
    }

    return ret;

}]);
/* Ex.: 

.service('BlankService', [function(){

}]);

*/