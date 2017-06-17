
function BarGraphPlugin(){
  return function install(openmct){
    openmct.legacyRegistry.register("tutorials/bargraph", {
        "name": "Bar Graph Plugin",
        "description": "Provides the Bar Graph view of telemetry elements."});
    openmct.types.addType("example.bargraph",
            {
                "key": "example.bargraph",
                "name": "Bar Graph",
                "cssClass": "icon-autoflow-tabular",
                "description": "A Bar Graph.",
                creatable: true,
                initialize: function(object){
                  //object.limits = {"min":-1000, "max":1000}
                }
            });

    openmct.legacyExtension("views",
            {
                "name": "Bar Graph",
                "key": "example.bargraph",
                //TODO: Complain to upstream developers about bad templateUrl resolution.
                "templateUrl": "../../bar_graph_plugin/res/templates/bargraph.html",
                //Error: no services to agregate ?
                //Maybe because I am not in requirejs?
                //"needs": [ "telemetry" ],
                "delegation": true
            }
    );
  openmct.legacyExtension("stylesheets",
          {
              //TODO: Complain to upstream developers about bad stylesheetUrl resolution.
              "stylesheetUrl": "../../../../../bar_graph_plugin/res/css/bargraph.css"
          }
        );


  };
}
