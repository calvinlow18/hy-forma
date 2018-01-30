const toStringFormat = "{0}\t\t{1}\t\t\t{2}";
const stringFormat = require("./utils/string-format");

module.exports = function router() {
    var routes = [];


    return {
        routes: routes,

        route: route,
        get: get,
        post: post,
        put: put,
        delete: del,

        toString: toString,
    }

    function route(method, url, callback) {
        routes.push({
            method: method,
            url: url,
            callback: callback,
        })
    };

    function get(url, callback) {
        return route("GET", url, callback);
    };

    function post(url, callback) {
        return route("POST", url, callback);
    };

    function put(url, callback) {
        return route("PUT", url, callback);
    };

    function del(url, callback) {
        return route("DELETE", url, callback);
    };

    function toString() {
        var result = "";
        for (var i in routes) {
            var route = routes[i];
            result += stringFormat(toStringFormat, route.method, route.url, route.callback) + "\n";
        }
        return result;
    }
}