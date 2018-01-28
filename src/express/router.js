const url = require("../utils/url");
const workingDir = process.cwd();
const jstring = require("../utils/jstring");
// options = {
//    url: "/",
//    baseFolder: "/",
//    prettyResult: false,
// }

module.exports = function router(expressApp, routeConfig, options) {
    var callbackHandlers = {
        "string": stringCallbackHandler,
        "function": functionCallbackHandler,
    }
    options = options || {};
    var baseUrl = options.url || "/";
    var routes = routeConfig.routes;
    var prettyResult = options.prettyResult;
    var jsonify = prettyResult ? jstring : JSON.stringify;


    for (var i in routes) {
        var config = routes[i];
        var routeUrl = config.url;
        var callback = config.callback;
        var method = config.method.toLowerCase();
        var callbackType = typeof (callback);

        var callbackHandler = callbackHandlers[callbackType];
        var callbackFunction = callbackHandler(callback);
        var wrappedAsync = wrapAsync(callbackFunction);
        expressApp[method](routeUrl, wrappedAsync);
    }

    function functionCallbackHandler(callback) {
        return callback;
    }

    function stringCallbackHandler(callbackNamespace) {
        var callbackNamespaceSplit = callbackNamespace.split(".");
        var functionName = callbackNamespaceSplit.pop();
        var callbackPath = callbackNamespaceSplit.join("/");
        var controllerPath = url(workingDir, baseUrl, callbackPath);
        var controller = require(callbackPath)[functionName];
        return controller;
    }

    function wrapAsync(callbackFunction) {

        return function (req, res, next) {
            var resultPromise = callbackFunction(req, res, next);
            if (resultPromise && resultPromise.then)
                resultPromise.then(function (result) {
                    res.end(jsonify(result));
                });
            return resultPromise;
        }

    }

}