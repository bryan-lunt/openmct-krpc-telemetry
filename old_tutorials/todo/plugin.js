    // Form to display when adding new tasks
    var NEW_TASK_FORM = {
        name: "Add a Task",
        sections: [{
            rows: [{
                name: 'Description',
                key: 'description',
                control: 'textfield',
                required: true
            }]
        }]
    };

   function TodoController($scope, dialogService) {
        var showAll = true,
            showCompleted;

        // Persist changes made to a domain object's model
        function persist() {
            var persistence =
                $scope.domainObject.getCapability('persistence');
            return persistence && persistence.persist();
        }

       // Remove a task
       function removeTaskAtIndex(taskIndex) {
           $scope.domainObject.useCapability('mutation', function
       (model) {
               model.tasks.splice(taskIndex, 1);
           });
           persist();
       }

       // Add a task
       function addNewTask(task) {
           $scope.domainObject.useCapability('mutation', function
           (model) {
               model.tasks.push(task);
           });
           persist();
       }

        // Change which tasks are visible
        $scope.setVisibility = function (all, completed) {
            showAll = all;
            showCompleted = completed;
        };

        // Toggle the completion state of a task
        $scope.toggleCompletion = function (taskIndex) {
            $scope.domainObject.useCapability('mutation', function (model) {
                var task = model.tasks[taskIndex];
                task.completed = !task.completed;
            });
            persist();
        };

        // Check whether a task should be visible
        $scope.showTask = function (task) {
            return showAll || (showCompleted === !!(task.completed));
        };

        // Handle selection state in edit mode
       if ($scope.selection) {
           // Expose the ability to select tasks
           $scope.selectTask = function (taskIndex) {
               $scope.selection.select({
                   removeTask: function () {
                       removeTaskAtIndex(taskIndex);
                       $scope.selection.deselect();
                   }
               });
           };

           // Expose a view-level selection proxy
           $scope.selection.proxy({
               addTask: function () {
                   dialogService.getUserInput(NEW_TASK_FORM, {})
                       .then(addNewTask);
               }
           });
       }
    }

function TodoPlugin() {
  return function(openmct) {

    openmct.legacyRegistry.register("tutorials/todo", {
        "name": "To-do Plugin",
        "description": "Allows creating and editing to-do lists."
      });
      openmct.legacyExtension(
         "types",
          {
              "key": "example.todo",
              "name": "To-Do List",
              "cssClass": "icon-check",
              "description": "A list of things that need to be done.",
              "features": ["creation"],
              "model": {
                   "tasks": [
                       { "description": "Add a type", "completed": true },
                       { "description": "Add a view" }
                   ]
                }
          });
      openmct.legacyExtension(
          "views",
           {
               "key": "example.todo",
               "type": "example.todo",
               "cssClass": "icon-check",
               "description": "this should be a hybrid legacy/plugin todolist.",
               "name": "List",
               "template": `<div ng-controller="TodoController">
                       <div>
                         <a ng-click="setVisibility(true)">All</a> |
                         <a ng-click="setVisibility(false, false)">Incomplete</a> |
                         <a ng-click="setVisibility(false, true)">Complete</a>
                       </div>

                       <ul>
                           <li ng-repeat="task in model.tasks"
                             ng-if="showTask(task)">
                              <input type="checkbox"
                                     ng-checked="task.completed"
                                    ng-click="toggleCompletion($index)">
                              <span ng-click="selectTask($index)">
                                {{task.description}}
                                </span>
                           </li>
                       </ul>
                </div>
`,
               "editable": true,
               "toolbar": {
                   "sections": [
                       {
                           "items": [
                               {
                                   "text": "Add Task",
                                   "cssClass": "icon-plus",
                                   "method": "addTask",
                                   "control": "button"
                               }
                           ]
                       },
                       {
                           "items": [
                               {
                                   "cssClass": "icon-trash",
                                   "method": "removeTask",
                                   "control": "button"
                               }
                           ]
                       }
                   ]
               }
           });
      openmct.legacyExtension("controllers",
      {
               "key": "TodoController",
               "implementation": TodoController,
               "depends": [ "$scope", "dialogService" ]
           });

    };
}
