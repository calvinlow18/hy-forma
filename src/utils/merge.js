module.exports = function merge() {
    var objects = arguments;
    var result = {};
    for (var i in objects) {
        result = recursiveMerge(result, objects[i]);
    }
    return result;

    function recursiveMerge(a, b) {
        var recursiveResult = {};
        if (Array.isArray(a) && Array.isArray(b))
            recursiveResult = [];
        for (var i in a)
            recursiveResult[i] = a[i];
        for (var j in b) {
            if (j in recursiveResult) {

                if (typeof (recursiveResult[j]) == typeof (b[j]) && typeof (b[j]) == "object")
                    recursiveResult[j] = recursiveMerge(recursiveResult[j], b[j])
                else
                    recursiveResult[j] = b[j];
            } else
                recursiveResult[j] = b[j];
        }
        return recursiveResult;
    }
}