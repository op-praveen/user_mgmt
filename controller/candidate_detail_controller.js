// directive for read resume file  start
myApp.directive("fileread", [
  function () {
    return {
      scope: {
        fileread: "=",
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          scope.$apply(function () {
            scope.fileread = changeEvent.target.files[0];
            // or all selected files:
            // scope.fileread = changeEvent.target.files;
          });
        });
      },
    };
  },
]);
// directive for read resume file  end

// For candidate detail controller section start
myApp.controller(
  "candidate_detail_controller",
  function (
    $scope,
    $http,
    $stateParams,
    $mdToast,
    $log,
    toastService,
    $mdDialog,
    $filter,
    $modal,
    $log
  ) {
    // $scope.city = demo.search_candidate;
    $scope.showSimpleToast = function ($msg) {
      //test your toast working!
      toastService.showSimpleToast($mdToast, $log, $msg);
    };

    // for get candidate detail by id start
    var cand_id = $stateParams.cand_id;
    if (cand_id != "" && cand_id != undefined) {
      console.log(cand_id);

      var url =
        "http://localhost/user_mgmt/db/get_candidate.php?for=get_cand_detail&cand_id=" +
        cand_id;
      $http.get(url).success(function (res) {
        if (res.length > 0) {
          $scope.candi_detail = res;
        } else {
          return (window.location = "/");
        }
      });
      // return false;
    } else {
      return false;
    }
    // for get candidate detail by id end

    // for get project detail by Candidate id start
    if (cand_id != "" && cand_id != undefined) {
      console.log(cand_id);
      getProject();
      function getProject() {
        var url =
          "http://localhost/user_mgmt/db/edit_candidate.php?for=get_all_project&cand_id=" +
          cand_id;
        $http.get(url).success(function (res) {
          // if (res.length > 0) {
          $scope.project_by_candId = res;
          console.log("project");
          console.log(res);
          // } else {
          //   // return (window.location = "/");
          // }
        });
      }
      // return false;
    } else {
      return false;
    }

    $scope.getProject = function () {
      getProject();
    };
    // for get project detail by Candidate id end

    //---------------------------------------------------------------------------------------
    //-------------for add more candidate project modal popup functionality start here-------
    //---------------------------------------------------------------------------------------
    $scope.candi_project = {
      hidden_id: 0,
      cand_id: cand_id,
      project_name: "",
      website: "",
      role: "",
      start_date: "",
      end_date: "",
      still_work: "",
      resume: "",
      project_desc: "",
      add_teammate: "",
      skill: "",
    };
    $scope.reset = function () {
      $scope.candi_project.hidden_id = 0;
      $scope.candi_project.cand_id = cand_id;
      $scope.candi_project.project_name = "";
      $scope.candi_project.website = "";
      $scope.candi_project.role = "";
      $scope.candi_project.start_date = "";
      $scope.candi_project.end_date = "";
      $scope.candi_project.still_work = "";
      $scope.candi_project.resume = "";
      $scope.candi_project.project_desc = "";
      $scope.candi_project.add_teammate = "";
      $scope.candi_project.skill = "";
    };
    // FOR edit RECORD START
    $scope.edit_prject = function (proj_id) {
      // console.log(proj_id);
      $http({
        method: "POST",
        url: "http://localhost/user_mgmt/db/edit_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "for_edit_project",
          proj_id: proj_id,
        },
      }).success(function (res) {
        console.log(res);
        if (res[0].start_date == "0000-00-00") {
          $start_date = "00-00-0000";
        } else {
          $start_date = new Date(res[0].start_date);
        }
        if (res[0].end_date == "0000-00-00") {
          $end_date = "00-00-0000";
        } else {
          $end_date = new Date(res[0].end_date);
        }
        // console.log($start_date);
        $scope.candi_project.hidden_id = res[0].id;
        $scope.candi_project.cand_id = res[0].cand_id;
        $scope.candi_project.project_name = res[0].project_name;
        $scope.candi_project.website = res[0].website;
        $scope.candi_project.role = res[0].role;
        $scope.candi_project.start_date = $start_date;
        $scope.candi_project.end_date = $end_date;
        // on edit cannge still work value to true/false
        $scope.candi_project.still_work = res[0].still_work == 1 ? true : false;
        $scope.candi_project.resume = res[0].resume;
        $scope.candi_project.project_desc = res[0].project_desc;
        $scope.candi_project.add_teammate = res[0].add_teammate;
        $scope.candi_project.skill = res[0].skill;
        $scope.open($scope.candi_project);

        if (res.error != "") {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = res.error;
        } else {
          $scope.success = true;
          $scope.error = false;
          $scope.errorMessage = res[0].message;
        }
      });
    };
    // FOR DELETE RECORD START
    $scope.delete_project = function (proj_id) {
      console.log(proj_id);
      $http({
        method: "POST",
        url: "http://localhost/user_mgmt/db/edit_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "for_delete",
          proj_id: proj_id,
        },
      }).success(function (res) {
        $scope.reset();
        $scope.getProject();
        if (res.status == 200 && res.message == "Deleted") {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Project Data Deleted successfully..."
          );
        } else {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Having some issue on operation.."
          );
        }
        if (res.error != "") {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = res.error;
        } else {
          $scope.success = true;
          $scope.error = false;
          $scope.errorMessage = res.message;
        }
      });
    };

    $scope.animationsEnabled = true;
    // for opend modal start here
    $scope.open = function (edit_data) {
      console.log("edit_data=");
      console.log(edit_data);
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: "view/project_modal.html",
        controller: "add_pro_modal_Ctrl",
        size: "xl",
        resolve: {
          items: function () {
            if (edit_data) {
              return { candi_project: edit_data, scope: $scope };
            } else {
              $scope.reset();
              return { candi_project: $scope.candi_project, scope: $scope };
            }
          },
        },
      });

      modalInstance.result.then(
        function (selectedItem) {
          $scope.selected = selectedItem;
        },
        function () {
          $log.info("Modal dismissed at: " + new Date());
        }
      );
    };
    // for opend modal end

  }
);
// For candidate detail controller section end

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

// For project model controller section start
myApp.controller(
  "add_pro_modal_Ctrl",
  function (
    $scope,
    $modalInstance,
    items,
    $stateParams,
    $http,
    toastService,
    $mdToast,
    $log
  ) {
    console.log(items);
    var cand_id = $stateParams.cand_id;
    var parent_scope = items.scope;
    // get all project of the candidate
    $scope.getProject = function () {
      var url =
        "http://localhost/user_mgmt/db/edit_candidate.php?for=get_all_project&cand_id=" +
        cand_id;
      $http.get(url).success(function (res) {
        if (res.length > 0) {
          $scope.project_by_candId = res;
          console.log("project");
          console.log(res);
        } else {
          // return (window.location = "/");
        }
      });
    };
    // for ok
    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };
    // dismiss modal popup
    $scope.cancel = function () {
      $modalInstance.dismiss("cancel");
    };
    // select project list by candidate id
    $scope.getProject = function () {
      var url =
        "http://localhost/user_mgmt/db/edit_candidate.php?for=get_all_project&cand_id=" +
        cand_id;
      $http.get(url).success(function (res) {
        if (res.length > 0) {
          $scope.project_by_candId = res;
          console.log("project");
          console.log(res);
        } else {
          // return (window.location = "/");
        }
      });
    };
    // assing candi_project from parent controller(candidate_detail_controller)
    $scope.candi_project = items.candi_project;

    // reset var value after add/update 
    $scope.reset = function () {
      $scope.candi_project.hidden_id = 0;
      $scope.candi_project.cand_id = cand_id;
      $scope.candi_project.project_name = "";
      $scope.candi_project.website = "";
      $scope.candi_project.role = "";
      $scope.candi_project.start_date = "";
      $scope.candi_project.end_date = "";
      $scope.candi_project.still_work = "";
      $scope.candi_project.resume = "";
      $scope.candi_project.project_desc = "";
      $scope.candi_project.add_teammate = "";
      $scope.candi_project.skill = "";
    };

    // setting up custom validion error color
    $scope.pnameValid = true;
    $scope.pnameVTouched = false;
    // $scope.isProjectTitleErrShow='f2.t2.$touched && f2.t2.$error.required';
    $scope.proNamelen = $scope.candi_project.project_name.length;
    // calculate project name lenth start
    $scope.checkLengthProName = function () {
      $scope.pnameVTouched = true;
      var pname = $scope.candi_project.project_name;
      $scope.proNamelen = pname == undefined ? 0 : pname.length;
      console.log($scope.proNamelen);
      if ($scope.proNamelen == 0) {
        $scope.pnameValid = false;
        $scope.isProjectTitleErrShow =
          "f2.t2.$touched && f2.t2.$error.required";
        $scope.proErorMsg = "Project title is required.";
      } else if ($scope.proNamelen > 100) {
        // alert('greater')
        $scope.pnameValid = false;
        $scope.isProjectTitleErrShow =
          "f2.t2.$touched && f2.t2.$error.maxlength";
        $scope.proErorMsg = "Maximum 100 characters";
      } else {
        $scope.pnameValid = true;
        $scope.proErorMsg = "";
        $scope.isProjectTitleErrShow = "";
      }
    };
    // calculate project name lenth end

    // for add porject of candidate start
    $scope.ADD_CANDID_PROJECT = function (form_data) {
      // console.log(form_data.resume);
      $http({
        method: "POST",
        url: "http://localhost/user_mgmt/db/edit_candidate.php",
        headers: {
          // "Content-Type": undefined,
          "Content-Type": "application/x-www-form-urlencoded",
          // "Process-Data": false,
        },
        data: {
          for: "insert_project_candidate",
          hidden_id: $scope.candi_project.hidden_id,
          cand_id: $scope.candi_project.cand_id,
          project_name: form_data.project_name,
          website: form_data.website,
          role: form_data.role,
          start_date: form_data.start_date,
          end_date: form_data.end_date,
          still_work: form_data.still_work,
          resume: "",
          project_desc: form_data.project_desc,
          add_teammate: form_data.add_teammate,
          skill: form_data.skill,
        },
      }).success(function (res) {
        console.log(res.status);
        console.log(res.message);
        $scope.hide = true;
        $scope.cancel(); //calling cancel function for hide modal popup
        parent_scope.getProject(); //trigger function for get all project
        if (res.status == 200 && res.message == "updated") {
          console.log("project updated successfully");
          $scope.insert_resume_file(res.last_id);
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "data updated successfully..."
          );
        } else if (res.status == 200 && res.message == "insert") {
          $scope.insert_resume_file(res.last_id);
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Project data inserted successfullly..."
          );
        } else {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Having some issue on operation.."
          );
        }
        $scope.reset(); // for reset input
        if (res.error != "") {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = res.error;
        } else {
          $scope.success = true;
          $scope.error = false;
          $scope.errorMessage = res.message;
        }
      });

      // separate function for upload resume start
      $scope.insert_resume_file = function (last_id) {
        var fd = new FormData();
        var files = document.getElementById("file").files[0];
        console.log(files);
        console.log(typeof(files));
        if (files!='undefined') {
          console.log(last_id);
          if (last_id != "") {
            fd.append("file", files);
            fd.append("last_id", last_id);
            console.log(fd);
            console.log("file upload starting...");
            console.log(last_id);
            $http({
              method: "POST",
              url: "http://localhost/user_mgmt/db/upload.php",
              headers: {
                "Content-Type": undefined,
                // "Content-Type": "application/x-www-form-urlencoded",
                // "Process-Data": false,
              },
              data: fd,
            }).then(
              function (response) {
                console.log("showing on success");
                console.log(response);
                console("upload.php response");
              },
              function (response) {
                console.log("showing on failure");
                console.log(response);
              }
            );
          }
        }
      };
      // separate function for upload resume end

    };
    // for add porject of candidate end


    // for enable/disable enddate based on stil_work checkbox start
    $scope.disable_enddate = false;
    if ($scope.candi_project.still_work == true) {
      $scope.disable_enddate = true;
    }
    $scope.stil_work = function (status) {
      console.log(status);
      if (status) {
        $scope.disable_enddate = true;
        $scope.candi_project.end_date = "";
      } else {
        $scope.disable_enddate = false;
      }
    };
    // for enable/disable enddate based on stil_work checkbox end

  }
);
// For project model controller section end
