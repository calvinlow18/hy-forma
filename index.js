const baseSource = "./src";

var forma = {
    components: {
        mongo: sourceRequire("components/mongo")
    },
    utils: {
        argsenv: sourceRequire("utils/argsenv"),
        url: sourceRequire("utils/url"),
        guid: sourceRequire("utils/guid"),
        stripDash: sourceRequire("utils/strip-dash"),
        cleanUndefined: sourceRequire("utils/clean-undefined"),
        mongo: sourceRequire("utils/mongo"),
        jstring: sourceRequire("utils/jstring"),
        functionArguments: sourceRequire("utils/function-arguments"),
        stringFormat: sourceRequire("utils/string-format"),
        difference: sourceRequire("utils/difference"),
        cleanNull: sourceRequire("utils/clean-undefined"),
        cleanEmpty: sourceRequire("utils/clean-empty"),
    },
    express: {
        middleware: sourceRequire("express/middleware"),
        router: sourceRequire("express/router"),
    },
    router: sourceRequire("router"),
    logger: sourceRequire("logger"),
}


function sourceRequire(path) {
    return require(baseSource + "/" + path)
}

module.exports = forma;