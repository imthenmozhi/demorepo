var app=angular.module('myapp',[]);
app.controller('myCtrl',function($scope,$http){
	$scope.errorMsg={};
	$scope.showUpdBm=false;
    var studId;

    //.....Fetching Data Value From Db Via Function Call........
    var loadMaster=function(){
		
		$http.get('/api/stuarray').then(function success(data){
			
			$scope.stuArrs=data.data.data;
		},function error(){
			console.log("error occur")
		});
	}
	$scope.person={};


	//.....Create/Add Data........
	$scope.createData=function(){
		$scope.person1=angular.copy($scope.person);
		
		$http.post('/api/stu',$scope.person1)
		.then(function success(data){
			$scope.stuArrs=[];
			$scope.errorMsg={};
			
			console.log(data);

			if(data && data.data.data){
				loadMaster();
			}
			else{
				$scope.errorMsg=data.data;
				console.log(data)
			}
			loadMaster();
			},function error(){

			});
		$scope.person={};
	}
		
    $scope.person.dateOfBirth= new Date($scope.person.dateOfBirth);

    // ..........Update/Edit Data.......૞
    $scope.updateRow=function(id){
    	//....Read/Showing Data....
    	console.log("$scope.person") 

    	$http.post('/api/studUpdate',$scope.person)
    	.then(function success(data){
    		console.log(data)
    		loadMaster();
    	},function error(){
    		console.log("error")
     	});
     	$scope.person={};
 	};

	$scope.checkRow = function (name) {
		$scope.showUpdBm=true;
		angular.forEach($scope.stuArrs, function(stuArrs){
		
		if(name == stuArrs.id){
			stuArrs.selected = true;
		}else{
			stuArrs.selected = false;
		}
		});
	};
    
    //.....View Data In Form......
    $scope.setSelectedpersonalDetail = function(index){
       $scope.person = angular.copy($scope.stuArrs[index]);
   	    $scope.person.dateOfBirth = new Date($scope.person.dateOfBirth)
    };

    //.....Remove/Delete Data......
 	$scope.removeRow=function(studId){
 	
 		console.log($scope.person._id)
 		studId = $scope.person._id;
 		$http.get("/api/remove/"+studId).then(function success(){
 			console.log($scope.stuArrs)
 		loadMaster();
 		$scope.person={};
 		});
 	};
 	
 	loadMaster();
});