var app = angular.module('myApp', []);

app.service('todoService', function () {
    var tasks = [
        { description: 'Task 2', completed: false },
        { description: 'Task 1', completed: true }
    ];

    this.getTasks = function () {
        return tasks;
    };

    this.addTask = function (task) {
        tasks.push({ description: task, completed: false });
    };

    this.removeTask = function (task) {
        var index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
    };
});

app.controller('todoList', function ($scope, todoService) {
    $scope.tasks = todoService.getTasks();
    $scope.newTask = '';

    $scope.addTask = function () {
        if ($scope.newTask) {
            todoService.addTask($scope.newTask);
            $scope.newTask = '';
        }
    };

    $scope.removeTask = function (task) {
        todoService.removeTask(task);
    };
});