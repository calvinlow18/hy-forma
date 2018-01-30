module.exports = function difference(obj1, obj2) {
    return recursiveDifference(obj1, obj2, "");
}

function recursiveDifference(obj1, obj2, prefix) {
    var differences = [];
    for (var i in obj1) {
        if (!(i in obj2)) {
            differences.push(i);
            continue;
        }
        var type1 = typeof (obj1[i]);
        var type2 = typeof (obj2[i]);
        if (type1 != type2) {
            differences.push(i);
            continue;
        };
        if (type1 == type2 == "object") {
            var newPrefix = prefix + (prefix == "" ? "" : ".") + i;
            differences = differences.concat(recursiveDifference(obj1[i], obj2[i], newPrefix))
        }
    }
    return differences;
}