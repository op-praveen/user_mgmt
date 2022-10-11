myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      views: {
        "": {
          templateUrl: "view/home.html",
          controller: "autoCompleteController",
        },
      },
    })
    .state("add_candiate", {
      url: "/add_candiate",
      views: {
        "": {
          templateUrl: "view/add_candidate.htm",
          controller: "candidate_Controller",
        },
      },
    })
    .state("view_candidate", {
      url: "/view_candidate/{cand_id:[0-9]+}", //set candidate_id param should be 0-9 
      views: {
        "": {
          templateUrl: "view/view_candidate.html",
          controller: "candidate_detail_controller",
        },
      },
    })
    .state("otherwise",{
      url:"*path",
      views:{
        "":{
          template: "<h1>Page not found</h1>",
        }
      }
    });
});