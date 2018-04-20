module.exports = function combine() {
    var objects = arguments;
    var result = {};
    for (var i in objects) {
        var object = objects[i];
        if (!object || typeof (object) != "object" || Array.isArray(object))
            continue;
        for (var j in object)
            result[j] = object[j];
    }
    return result;
}