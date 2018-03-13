module.exports = function cleanNull(obj) {
    for (var key in obj)
        if (obj[key] === null)
            delete obj[key]
}