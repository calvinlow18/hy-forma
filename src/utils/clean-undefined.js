module.exports = function cleanUndefined(obj) {
    for (var key in obj)
        if (obj[key] === undefined)
            delete obj[key]
}