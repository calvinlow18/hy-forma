module.exports = function cleanEmpty(obj) {
    for (var key in obj)
        if (obj[key] === null || obj[key] === undefined)
            delete obj[key]
}