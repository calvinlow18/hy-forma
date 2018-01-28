module.exports = function router() {
    var routes = [];


    return {
        routes: routes,

        route: route,
        get: get,
        post: post,
        put: put,
        delete: del,
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

}