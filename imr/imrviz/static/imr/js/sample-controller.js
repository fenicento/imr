angular.module('App', []);

function FormController($scope,$filter) {
  
$scope.spaces=[]
$scope.years={}
 
  $scope.addSpace = function(i) {
     ex={}
     for(el in $scope.spaces) {
      if($scope.spaces[el].name!==i) {
        ex[$scope.spaces[el].name]="";
        $scope.spaces[el].exchanges[i]="";
      }
     }

     $scope.spaces.push({"name":i,
      "population":"",
      "surface":"",
      "stock":"",
      "yeld":"",
      "demand":"",
      "offer":"",
      "exchanges":ex
    })
     //REDO that
     angular.forEach($scope.years, function(value, key) {
      a=value.filter(function(e){
          return e.name==i
        })
      diff=$scope.spaces.filter(function(e){
          return e.name!==i
        })
     ex={}
     diff.forEach(function(d){ex[d.name]=""})

     if (a.length==0) value.push(
      {"name":i,
      "population":"",
      "surface":"",
      "stock":"",
      "yeld":"",
      "demand":"",
      "offer":"",
      "exchanges":ex
      })
      value.forEach(function(v){
        if(v.name!=i && !v.exchanges[i]) v.exchanges[i]="";  
      })
     })
  };


  $scope.addYear = function(i) {
     $scope.years[i]= angular.copy($scope.spaces);
  };

  $scope.remYear = function(i) {
     delete($scope.years[i])
  };

  $scope.removeSpace = function(sp) {
    a=$scope.spaces.filter(function(e){
          return e.name===sp.name
        })
    for(it in a) {
        $scope.spaces.splice($scope.spaces.indexOf(it), 1);
     }

     b=$scope.spaces.filter(function(e){
          return e.name!==sp.name
        })
    for(it in b) {

        delete($scope.spaces[it].exchanges[sp.name])
     }
    angular.forEach($scope.years, function(value, key) {
      a=value.filter(function(e){
          return e.name===sp.name
        })
     for(it in a) {
        value.splice(value.indexOf(it), 1);
     }

     b=value.filter(function(e){
          return e.name!==sp.name
        })
     for(it in b) {
      console.log(value[it]);
        delete(value[it].exchanges[sp.name])
     }
     })
  };

  $scope.useData=function() {
    data=$scope.years;
    $("#form").hide();
    $(".vizspace").show();
    start();
    //$scope.$apply();
  }
}
