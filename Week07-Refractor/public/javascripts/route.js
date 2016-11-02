/**
 * Created by bcuser on 11/2/16.
 */
define(function () {

    function Route() {
        this.route = '';
    }

    Route.prototype.setRoute = function (routeInit) {
        this.route = routeInit;
    };

    Route.prototype.when = function (route, control) {
        if (route === this.route) {
            var resolver = {
                getController: function () {
                    return control.controller
                }
            };

            for (var funcName in control.resolve) {
                control.resolve[funcName](resolver);
            }
        }
        return this;
    };

    Route.prototype.otherwise = function () {
        // DO NOTHING FOR NOW
    };

    return Route;

});