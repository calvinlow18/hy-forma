const summarizeFunction = require("./summarize-function");

module.exports = function summarizeObject(obj) {
    if (typeof (obj) == "function")
        return summarizeFunction(obj);
    if (typeof (obj) == "object") {
        var result = {};
        for (var key in obj) {
            var child = obj[key];
            result[key] = summarizeObject(child);
        }
        return result;
    }
    return obj;
}