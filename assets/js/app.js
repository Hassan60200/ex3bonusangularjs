//declaration de l'app
var mailboxApp = angular.module('mailboxApp',['ngRoute']);
    //au demarrage de mon appli
    mailboxApp.run(function($rootScope){
        //j'initialise mes tableaux
        $rootScope.userNameList=[];
        $rootScope.userMailList=[];
        $rootScope.userSubjectList=[];
        $rootScope.userMessageList=[];
    });
//initialisation des routes
mailboxApp.config(function($routeProvider){
    $routeProvider
    .when('/home',{
        controller: 'homeController',
        templateUrl : 'partials/home.html'
    })
    // dans cette route, on récupère un paramêtre : id
    .when('/message/:id?',{
        controller: 'messageController',
        templateUrl: 'partials/message.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
});
//controller homeController
mailboxApp.controller('homeController',function($rootScope,$scope){
    //lorsque mon formulaire est soumis
    $scope.formSubmit=function(valid){
            if (valid){
                //je scope les varialbles du formulaire et les ajoute aux tableaux
                $rootScope.userNameList.push( $scope.userName );
                $rootScope.userMailList.push( $scope.userMail );
                $rootScope.userSubjectList.push( $scope.userSubject );
                $rootScope.userMessageList.push( $scope.userMessage );
            }
    };
})
//controller messageController
.controller('messageController',function($rootScope,$scope,$routeParams){
    // je récupère le parametre indiqué dans la route (c'est l'index de mes tableaux)
    $scope.id=$routeParams.id;
    //je recupère les varialbles dans les tableaux correspondants, à l'index 'id'
    $scope.userName=$rootScope.userNameList[$scope.id];
    $scope.userMail=$rootScope.userMailList[$scope.id];
    $scope.userSubject=$rootScope.userSubjectList[$scope.id];
    $scope.userMessage=$rootScope.userMessageList[$scope.id];
});
