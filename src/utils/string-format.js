module.exports = function stringFormat() {
    var args = Array.prototype.slice.call(arguments);
    var result = args.shift();
    var values = args;
    for (var i in values) {
        result = result.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
    }
    return result;
}