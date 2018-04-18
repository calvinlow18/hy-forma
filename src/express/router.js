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
    var baseFolder = options.baseFolder || "/";
    var routes = routeConfig.routes;
    var prettyResult = options.prettyResult;


    for (var i in routes) {
        var route = routes[i];
        var routeUrl = route.url;
        var callback = route.callback;
        var method = route.method.toLowerCase();
        var callbackType = typeof (callback);

        var callbackHandler = callbackHandlers[callbackType];
        var callbackFunction = callbackHandler(callback);
        var wrappedAsync = wrapAsync(callbackFunction);
        var endpoint = url(baseUrl, routeUrl);
        console.log(endpoint);
        expressApp[method](endpoint, wrappedAsync);
    }

    function functionCallbackHandler(callback) {
        return callback;
    }

    function stringCallbackHandler(callbackNamespace) {
        var callbackNamespaceSplit = callbackNamespace.split(".");
        var functionName = callbackNamespaceSplit.pop();
        var callbackPath = callbackNamespaceSplit.join("/");
        var controllerPath = url(workingDir, baseFolder, callbackPath);
        var controller = require(controllerPath)[functionName];
        return controller;
    }

    function wrapAsync(callbackFunction) {

        return function (req, res, next) {
            var resultPromise = callbackFunction(req, res, next);
            if (resultPromise && resultPromise.then)
                resultPromise.then(function (result) {
                    res.json(result);
                }, next);
            return resultPromise;
        }

    }

}