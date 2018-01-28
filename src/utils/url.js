module.exports = function url() {
    var urls = arguments;
    var result = arguments[0] || "/";
    for (var i = 1; i < arguments.length; i++) {
        result += "/" + arguments[i];
    }
    result = result.replace(/([^:]\/)\/+/g, "$1");
    return result;
};