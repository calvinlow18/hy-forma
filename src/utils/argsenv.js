var env = process.env;

module.exports = function argsenv() {
    process.argv.forEach(function (value) {
        var split = value.split("=");
        if (split.length == 2) {
            var key = split[0];
            var value = split[1];
            env[split[0]] = split[1];
            console.log("Argument ENV setting:", key, "=", value);
        }
    })
};