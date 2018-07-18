const url = require("../utils/url");

// options = {
//  url: "/"
// }

module.exports = function middleware(expressApp, middlewareConfig, options) {
    var handlers = {
        "function": functionHandler,
        "object": objectHandler,
    };

    options = options || {};
    var baseUrl = options.url || "/";

    for (var i in middlewareConfig) {
        var config = middlewareConfig[i];
        var configType = typeof (config);
        var handler = handlers[configType];
        handler(config);
    }

    function functionHandler(fn) {
        applyMiddleware(baseUrl, fn);
    }

    // config = {
    //     handler: fn,
    //     route: "/"
    // }
    function objectHandler(config) {
        var handler = config.handler;
        var route = config.route || "/";
        var endpoint = url(baseUrl, route);
        applyMiddleware(endpoint, handler)
    }

    function applyMiddleware(url, handler) {
        wrappedHandler = wrapHandler(handler);
        expressApp.use(url, wrappedHandler)
    }

    function wrapHandler(handler) {
        return function (req, res, next) {
            var execution = handler(req, res, next);
            if (execution instanceof Promise)
                execution.then(function () {
                    next();
                }, next);
        }
    }
};