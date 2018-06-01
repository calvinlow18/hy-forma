const baseSource = "./src";
const version = "0.2.9";

var forma = {
    components: {
        mongo: sourceRequire("components/mongo"),
        httpRequest: sourceRequire("components/http-request"),
    },
    utils: {
        argsenv: sourceRequire("utils/argsenv"),
        cleanEmpty: sourceRequire("utils/clean-empty"),
        cleanNull: sourceRequire("utils/clean-undefined"),
        cleanUndefined: sourceRequire("utils/clean-undefined"),
        combine: sourceRequire("utils/combine"),
        deepClean: sourceRequire("utils/deep-clean"),
        difference: sourceRequire("utils/difference"),
        functionArguments: sourceRequire("utils/function-arguments"),
        isEmptyObject: sourceRequire("utils/is-empty-object"),
        jstring: sourceRequire("utils/jstring"),
        mongo: sourceRequire("utils/mongo"),
        guid: sourceRequire("utils/guid"),
        stringFormat: sourceRequire("utils/string-format"),
        stripDash: sourceRequire("utils/strip-dash"),
        url: sourceRequire("utils/url"),
    },
    express: {
        middleware: sourceRequire("express/middleware"),
        router: sourceRequire("express/router"),
    },
    router: sourceRequire("router"),
    logger: sourceRequire("logger"),
    kernel: sourceRequire("kernel"),
    version: version
}

function sourceRequire(path) {
    return require(baseSource + "/" + path)
}

module.exports = forma;