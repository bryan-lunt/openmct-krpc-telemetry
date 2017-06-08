function FooIndicator() {
    var start = Date.now();
    var now = Date.now();
    var message = "Hello FOO!";

    function update() {
        now = Date.now();
    }

    function increment() {
        //noop, not sure if needed by API
    }

    // Update state every second
    //$interval(update, 1000);

    // Provide initial state, too
    update();

    return {
        /**
         * Get the CSS class that defines the icon
         * to display in this indicator. This will appear
         * as a dataflow icon.
         * @returns {string} the cssClass of the dataflow icon
         */
        getCssClass: function () {
            return "icon-connectivity";
        },
        getText: function () {
            return "Hello";
        },
        getDescription: function () {
            return "This is my first view plugin, adapted from DigestIndicator";
        }
    };
}

	function FooIndicatorPlugin() {
		return function(openmct) {
			var my_foo_indicator = new FooIndicator();
			//openmct.indicators.addProvider(my_foo_indicator);
      openmct.legacyExtension("indicators",
                  {
                      key: "foo_indicator",
                      implementation: FooIndicator
                  }
      );


		};
	}
