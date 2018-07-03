const baseSource = "./src";
const version = "0.2.13";
const summarizeObject = sourceRequire("utils/summarize-object");

var forma = {
    components: {
        mongo: sourceRequire("components/mongo"),
        httpRequest: sourceRequire("components/http-request"),
        mail: sourceRequire("components/mail"),
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
        stringRender: sourceRequire("utils/string-render"),
        stripDash: sourceRequire("utils/strip-dash"),
        summarizeFunction: sourceRequire("utils/summarize-function"),
        summarizeObject: summarizeObject,
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

forma.info = JSON.stringify(summarizeObject(forma), null, 4);

function sourceRequire(path) {
    return require(baseSource + "/" + path)
}

module.exports = forma;