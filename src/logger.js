var env = process.env;
envLogLevel = process.env.LOG_LEVEL;
const levels = {
    all: 128,
    debug: 64,
    info: 32,
    error: 16,
    off: 0,
};


function logger(level) {
    level = level || envLogLevel || "all";
    level = level.toLowerCase();
    var levelValue = levels[level];
    var result = {
        debug: noHandler,
        info: noHandler,
        error: noHandler,
    };

    if (levelValue >= levels.debug)
        result.debug = handleDebug();
    if (levelValue >= levels.info)
        result.info = handleInfo();
    if (levelValue >= levels.error)
        result.error = handleError();
    return result;
}

function noHandler() {}

function printConsole(level, message) {
    console.log(level + ":", message);
}

function handleDebug() {
    return function (message) {
        printConsole("debug", message);
    }
}

function handleInfo() {
    return function (message) {
        printConsole("info", message);
    }
}

function handleError() {
    return function (message) {
        printConsole("error", message);
    }
}

module.exports = logger;