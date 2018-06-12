module.exports = function (string, properties, options) {
    function convertReccursive(data) {
        var result = {};

        function reccursiveCrawler(data, name) {
            if (typeof (data) != "object" || Object.keys(data).length == 0)
                result[name] = data;
            else
                for (var i in data)
                    reccursiveCrawler(data[i], name == "" ? i : name + "." + i);
        }
        reccursiveCrawler(data, "");
        return result;
    }
    var result = string;
    var replace = [];
    var options = options || {};
    var prefix = options.prefix || "";
    var postfix = options.postfix || "";
    var buffer = convertReccursive(properties);
    if (options.only) {
        replace = options.only;
    } else {
        for (i in buffer)
            replace.push(i);
    }
    var except = options.except || [];
    for (var i = 0; i < except.length; i++) {
        var index = replace.indexOf(except[i]);
        if (index != -1)
            replace.splice(index, 1);

    }
    for (i in replace) {
        var name = replace[i];
        var reg = new RegExp("\\{\\{" + prefix + name + postfix + "\\}\\}", "g");
        var replacement = "";
        switch (typeof buffer[name]) {
            case "string":
                replacement = buffer[name];
                break;
            case "function":
                replacement = buffer[name]();
                break;
            default:
                break;
        }
        if (!isNaN(buffer[name]))
            replacement = buffer[name];
        result = result.replace(reg, replacement);
    }
    if (options.remove_rest) {
        var reg = new RegExp("{.*}", "g");
        result = result.replace(reg, "");
    }
    return result;
}