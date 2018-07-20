module.exports = function summarizeFunction(fn) {
    var fnString = fn.toString();
    var rightBracket = fnString.indexOf(")");
    return fnString.substr(0, rightBracket + 1);
}