    function BarGraphController($scope, dialogService, telemetryHandler) {
        var handle;
        // Add min/max defaults

        $scope.low = -1;
        $scope.middle = 0;
        $scope.high = 1;

        // Convert value to a percent between 0-100, keeping values in points
        $scope.toPercent = function (value) {
            var pct = 100 * (value - $scope.low) / ($scope.high - $scope.low);
            return Math.min(100, Math.max(0, pct));
        };

        console.dir(dialogService);
        console.dir(telemetryHandler);

        /*
        // Use the telemetryHandler to get telemetry objects here
        handle = telemetryHandler.handle($scope.domainObject, function () {
            console.log("handle function called.");
            $scope.telemetryObjects = handle.getTelemetryObjects();
            $scope.barWidth =
                100 / Math.max(($scope.telemetryObjects).length, 1);
        });

        // Get bottom and top (as percentages) for current value
        $scope.getBottom = function (telemetryObject) {
            var value = handle.getRangeValue(telemetryObject);
            return $scope.toPercent(Math.min($scope.middle, value));
        };

        $scope.getTop = function (telemetryObject) {
            var value = handle.getRangeValue(telemetryObject);
            return 100 - $scope.toPercent(Math.max($scope.middle, value));
        };

        // Release subscriptions when scope is destroyed
        $scope.$on('$destroy', handle.unsubscribe);
        */

}



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
                },
                "delegates" : [
                  "telemetry"
                ],
                "contains": [
                        {
                            "has": "telemetry"
                        }
                    ],
                "model":{
                  "composition":[]
                }
            });

    openmct.legacyExtension("views",
            {
                "name": "Bar Graph",
                "key": "example.bargraph",
                //TODO: If a type is not specified, the view is applied to every type.
                "type": "example.bargraph",
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
              //TODO: All of this may not be necessary, since the stylesheets use CSS classes...
              //I wonder if the system will use them to do anything at all to limit application of
              //this css?
              name: "Bar Graph stylesheet",
              key: "example.bargraph",
              type: "example.bargraph",
              //TODO: Complain to upstream developers about bad stylesheetUrl resolution.
              "stylesheetUrl": "../../../../../bar_graph_plugin/res/css/bargraph.css"
          }
        );

        openmct.legacyExtension("controllers",
        {
                 key: "BarGraphController",
                 "implementation": BarGraphController,
                 "depends": [ "$scope", "dialogService", "telemetryHandler" ]
             });

  };
}
