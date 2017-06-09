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
              "features": ["creation"]
          });
      openmct.legacyExtension(
          "views",
           {
               "key": "example.todo",
               "type": "example.todo",
               "cssClass": "icon-check",
               "name": "List",
               "templateUrl": "templates/todo.html",
               "editable": true
           });

    };


}
