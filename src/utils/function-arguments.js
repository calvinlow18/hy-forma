module.exports = function functionArguments(fn) {
    var fnString = fn.toString()
    var leftIndex = fnString.indexOf('(');
    var rightIndex = fnString.indexOf(')');
    var paramStr = fnString.substr(leftIndex + 1, rightIndex - leftIndex - 1);
    var params = paramStr.split(',');
    return params;
}