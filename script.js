angular.module('agendaMod', [])
  .controller('TodoCtrl', ['$scope', '$timeout', function($scope, $timeout) {

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
      period: "AM",
    }
    $scope.end = {
      hour: "11",
      minute: "00",
      period: "AM",
    }
    $scope.counter = 60;
    $scope.bool = true
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

    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else{
          console.log("timer done")
        }
    }
    $scope.mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.reset= function(){
        $scope.counter = 60;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
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
    }
    $scope.convertToMilitary = function(){
      if ($scope.starting.period = "PM"){
        console.log("clicked")

      }
      else if ($scope.starting.period = "AM"){

      }
    }
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







