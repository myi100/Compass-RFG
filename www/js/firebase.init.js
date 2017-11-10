angular.module('firebaseConfig', ['firebase'])

// .run(['$http'],function($http){
 
//   var config = {
//     apiKey: "AIzaSyBtkxEjFdXUUyPuuc8h_wScW9O-uXiZwE0",
//     authDomain: "compass-release.firebaseapp.com",
//     databaseURL: "https://compass-release.firebaseio.com",
//     projectId: "compass-release",
//     storageBucket: "compass-release.appspot.com",
//     messagingSenderId: "804739614254"
//   };   
  
//   $http({
//   method: 'GET',
//   url: config.databaseURL
      
//   }).then(function successCallback(response) {
//       firebase.initializeApp(config);
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });
// })

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtkxEjFdXUUyPuuc8h_wScW9O-uXiZwE0",
    authDomain: "compass-release.firebaseapp.com",
    databaseURL: "https://compass-release.firebaseio.com",
    projectId: "compass-release",
    storageBucket: "compass-release.appspot.com",
    messagingSenderId: "804739614254"
  };
  firebase.initializeApp(config);
})


.service("Directory", ["$firebaseArray", '$q', function($firebaseArray, $q){
    var ref = firebase.database().ref().child("directory");
    var directoryRef = $firebaseArray(ref);
    
    var directory = {
        items: directoryRef,
        filter: function(field, value){
            var defered = $q.defer();
            ref.orderByChild(field).equalTo(value).once("value").then(function(data) {
                defered.resolve(data.val());
            })
            return defered.promise;
    //         // https://github.com/davideast/Querybase
    //         // https://github.com/firebase/flashlight
    //         // https://stackoverflow.com/questions/22506531/how-to-perform-sql-like-operation-on-firebase
        }
    }
    
    return directory;
}])

.service("Todos", ["$firebaseArray", '$q', function($firebaseArray, $q){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);

    var todos = {
        items: items,
        addTodos: function(user, title, name, info, datetime, prereq, gtd){
            items.$add({
                'user': user,
                'title': title,
                'name': name,
                'info': info,
                'datetime': datetime,
                'prereq': prereq,
                'gtd': gtd,
                'finished': false,
                'tmsp': Date.now()
            });
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        },
        filter: function(userId){
            var defered = $q.defer();
            ref.orderByChild('user').equalTo(userId).once("value").then(function(data) {
                defered.resolve(data.val());
            })
            return defered.promise;
        }
    }
    return todos;
}])



.service("Updates", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("updates");
    var items = $firebaseArray(ref);
    var updates = {
        addItem: function(email, city){
            items.$add({
                email: email,
                city: city,
                tmsp: Date.now()
            })
        }
    }
    return updates;
}])

.service("Users", ["$firebaseArray", "$q", function($firebaseArray, $q){
    var ref = firebase.database().ref().child("users");
    var items = $firebaseArray(ref);
    var users = {
        'share': ref,
        addItem: function(obj){
            items.$add({
                phoneHash: obj.phoneHash,
                city: obj.city,
                country_code: obj.country_code,
                tmsp: Date.now()
            })
        },
        filter: function(phoneHash){
            var defered = $q.defer();
            ref.orderByChild('phoneHash').equalTo(phoneHash).once("value").then(function(data) {
                defered.resolve(data.val());
            })
            return defered.promise;
        }
    }
    
    return users;
}])

.service("Questions", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("questions");
    var items = $firebaseArray(ref);
    var questions = {
        addItem: function(userId, email, question){
            items.$add({
                userId: userId,
                email: email,
                question: question,
                tmsp: Date.now()
            })
        }
    }
    return questions;
}])

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/