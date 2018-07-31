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
    var logger = options.logger || function () {};
    var middlewares = [];

    for (var i in middlewareConfig) {
        var config = middlewareConfig[i];
        var configType = typeof (config);
        var handler = handlers[configType];
        handler(config);
    }

    return {
        middlewares
    }

    function functionHandler(fn) {
        method = "use";
        var routes = [baseUrl];
        applyMiddleware(method, routes, fn);
        addMiddlewareList(method, routes, fn);
    }

    // config = {
    //     handler: fn,
    //     route: "/"
    // }
    function objectHandler(config) {
        var handler = config.handler;
        var routeConfig = config.route || "/";
        var method = config.method || "use";
        var routes = routeConfig instanceof Array ? routeConfig : [routeConfig];
        for (var i in routes)
            routes[i] = url(baseUrl, routes[i]);

        applyMiddleware(method, routes, handler);
        addMiddlewareList(method, routes, handler);
    }

    function applyMiddleware(method, routes, handler) {
        var wrappedHandler = wrapHandler(handler);
        for (var i in routes) {
            var route = routes[i];
            expressApp[method](route, wrappedHandler);
        }
    }

    function addMiddlewareList(method, routes, handler) {
        middlewares.push({
            method: method,
            routes: routes,
            handler: handler,
        })
    }

    function wrapHandler(handler) {
        var result = [];
        if (typeof (handler) == "function")
            result.push(wrapSingleHandler(handler));
        if (handler instanceof Array)
            for (var i in handler) {
                result = result.concat(wrapHandler(handler[i]));
            }
        return result;
    }

    function wrapSingleHandler(handler) {
        return function (req, res, next) {
            logger(handler, req);
            var execution = handler(req, res, next);
            if (execution instanceof Promise)
                execution.then(function () {
                    next();
                }, next);
        }
    }
};