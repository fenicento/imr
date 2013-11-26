angular.module('App', []);

function FormController($scope) {
  
$scope.spaces=[]
$scope.years={}
 
  $scope.addSpace = function(i) {
     $scope.spaces.push({"name":i,
      "population":"",
      "stock":"",
      "yeld":"",
      "demand":"",
      "offer":"",
      "exchanges":[]
    })
     //REDO that
     if($scope.years.length>0 && !$scope.years[i]) $scope.years[i].push({
      "name":i,
      "population":"",
      "stock":"",
      "yeld":"",
      "demand":"",
      "offer":"",
      "exchanges":[]
    })
  };


  $scope.addYear = function(i) {
     $scope.years[i]= angular.copy($scope.spaces);
  };

  $scope.removeSpace = function(sp) {
    for (var i = 0, ii = $scope.spaces.length; i < ii; i++) {
      if (sp.name === $scope.spaces[i].name) {
        $scope.spaces.splice(i, 1);
      }
    }
  };
}
