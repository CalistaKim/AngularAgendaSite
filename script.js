angular.module('agendaMod', [])
  .controller('TodoCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.today 

    $scope.todos = [
      {text: 'Select a task', done:false},         
      {text: 'To get started', done:false},
      {text: 'delete us', done:false}
    ];

    $scope.steps = [
      {text: 'Step one'},         
    ];

    $scope.starting = {
      hour: "10",
      minute: "45",
      period: "PM",
    }
    $scope.end = {
      hour: "11",
      minute: "00",
      period: "AM",
    }
    $scope.secondCounter = 60;
    $scope.minuteCounter = 60;
    $scope.hourCounter = 0;
    $scope.bool = true
    $scope.startTime = 0
    $scope.endTime = 0

    $scope.getCurrentDate = function(){
      var current = new Date();
      var dd = current.getDate();
      var mm = current.getMonth()+1; //January is 0!
      var yyyy = current.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      current = mm+'/'+dd+'/'+yyyy;
      $scope.today = current

    }
    $scope.getTotalTodos = function () {
      return $scope.todos.length;
    };

    $scope.clearCompleted = function () {
      $scope.todos = _.filter($scope.todos, function(todo){
          console.log(todo.done)
          if (todo.done === true) {
            // remove all objects with the complete todo id from the steps array
            var index = $scope.steps.indexOf(todo);
            console.log(index)
            $scope.allStepsArray = $scope.steps.splice(index,1)
          }
          return todo.done === false;
          // return all of the todos that are not complete
      });
    };

    $scope.selectTask = function($event){
      $scope.taskId = event.currentTarget.id
      var result = $.grep($scope.steps, function(e){ return e.id === $scope.taskId; });
      if (result.length === 0 ){
        /* 
        if the active task is new, push an object containing the id to the steps array and 
        empty the steps list
        */
        console.log("new step id added to allsteps array")
        $scope.steps.push({id:$scope.taskId, allSteps:[]})
        $scope.allStepsArray = []
      }

      if (result.length > 0){
        /* 
        if the active task has already been added to steps array, 
        display the corresponding steps
        */
        console.log(result[0].id)
        if (result[0].id === $scope.taskId){
          $scope.allStepsArray = result[0].allSteps
        } 
      } 
      /* TESTING 
      console.log(result)
      console.log("result length: "+result.length)
      console.log("active task id: " + $scope.taskId)
      console.log("steps array contains: " + ($scope.steps.length-1)+ "tasks")
      */
    };

    $scope.addSomething = function($event) {
      var result = $.grep($scope.steps, function(e){ return e.id === $scope.taskId; });
      //returns the object with the id that matches the selected task's id 
      // allStepsArray is assigned to the allSteps key containing the steps text

      if (event.currentTarget.id == "addTask") {
        $scope.todos.push({text:$scope.formTodoText, done:false});
        $scope.formTodoText = '';
      }
      else if(event.currentTarget.id == "addStep"){
        $scope.allStepsArray = result[0].allSteps
        $scope.allStepsArray.push({text: $scope.formStepText});
        $scope.formStepText = '';
      }
      /*  TESTING
      console.log("Active task id: " + $scope.taskId)
      console.log("active task has steps: " + $scope.allStepsArray) 
      */
    };
    $scope.switch = function($event){
      $scope.bool = !$scope.bool
      if (event.currentTarget.id == "start" && $scope.bool === true){
        $scope.starting.period = "AM"
      }
      else if (event.currentTarget.id == "start" && $scope.bool === false){
        $scope.starting.period = "PM"
      }
      else if (event.currentTarget.id == "end" && $scope.bool === true){
        $scope.end.period = "AM"     
      }
      else if (event.currentTarget.id == "end" && $scope.bool === false){
        $scope.end.period = "PM"      
      }
    };
    $scope.convertToMilitary = function(){
      $scope.hourCounter = 0 
      $scope.secondCounter = 60
      $scope.minuteCounter = 0
      console.log(typeof $scope.starting.hour)
      if ( $scope.starting.period == "PM"){
        console.log( "added to counter: ", parseInt($scope.starting.hour) + 12 )
        $scope.hourCounter +=(parseInt($scope.starting.hour) + 12 ) 
      }
      else if ($scope.starting.hour == 12 && $scope.starting.period == "AM"){
        $scope.hourCounter +=(parseInt($scope.starting.hour) + 12 ) 
      }
      else if ($scope.starting.period == "AM"){
        $scope.hourCounter +=parseInt($scope.starting.hour) 
      }

      if ($scope.end.period == "PM"){
        $scope.hourCounter -=(parseInt($scope.end.hour) + 12 )
      }
      else if ($scope.end.hour == 12 && $scope.end.period == "AM"){
        console.log( "subtracted from counter: ", parseInt($scope.end.hour) + 12 )
        $scope.hourCounter -=(parseInt($scope.end.hour) + 12 ) 
      }
      else if ($scope.end.period == "AM") {
        console.log( "subtracted from counter: ", parseInt($scope.end.hour))
        $scope.hourCounter -=parseInt($scope.end.hour) 
      }
      $scope.minuteCounter = ($scope.starting.minute - $scope.end.minute)
      $scope.minuteCounter = Math.abs($scope.minuteCounter)
      $scope.hourCounter = Math.abs($scope.hourCounter)
    };
    $scope.onTimeout = function(){
        if ($scope.secondCounter > 0) {
            secondtimeout = $timeout($scope.onTimeout,1000);
            $scope.secondCounter--;
            console.log("seconds", $scope.secondCounter)
        }
        if ($scope.minuteCounter > 0 && $scope.secondCounter == 0){
            minutetimeout = $timeout($scope.onTimeout,60000);
            $scope.minuteCounter--;
            $scope.secondCounter = 60
            console.log("minute passed")
        }
        if ($scope.hourCounter > 0 && $scope.minuteCounter == 0 ){
            hourtimeout = $timeout($scope.onTimeout,3600000);
            $scope.hourCounter--;
            $scope.minuteCounter = 60
            console.log("hour passed")
        }       
    }
    $scope.secondtimeout = $timeout($scope.onTimeout,1000);
    $scope.minutetimeout = $timeout($scope.onTimeout, 60000)
    $scope.hourtimeout = $timeout($scope.onTimeout, 3600000)
 }])
  .directive('startFinish', function() {
    return {
      restrict: 'E',
      scope: {
        timeInfo: '=time'
      },
      templateUrl: 'start-finish.html'
    };
  })







