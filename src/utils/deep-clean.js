const cleanEmpty = require("./clean-empty");
const isEmptyObject = require("./is-empty-object");

module.exports = function deepClean(obj) {
    if (!obj)
        return null;
    for (var i in obj)
        if (typeof (obj[i]) == "object")
            obj[i] = deepClean(obj[i]);
    cleanEmpty(obj);
    if (isEmptyObject(obj))
        return null;
    return obj;
}