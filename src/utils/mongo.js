module.exports = {
    rangeQueryInclusive: rangeQueryInclusive,
    rangeQueryExclusive: rangeQueryExclusive,
    likeTrimIgnoreCaseQuery: likeTrimIgnoreCaseQuery,
    dateRangeQueryExclusive: dateRangeQueryExclusive,
    dateRangeQueryInclusive: dateRangeQueryInclusive
}

function likeTrimIgnoreCaseQuery(value) {
    if (value == undefined)
        return undefined;
    value = value.trim();
    regexValue = new RegExp(".*" + value + ".*", "i");
    return {
        $regex: regexValue
    }
}

function rangeQueryInclusive(from, to) {
    if (!from && !to)
        return null;
    var result = {};
    if (from)
        result.$gte = from;
    if (to)
        result.$lte = to;
    return result;
}

function dateRangeQueryInclusive(from, to) {
    if (!from && !to)
        return null;
    if (from)
        from = new Date(from);
    if (to)
        to = new Date(to);
    return rangeQueryInclusive(from, to);
}

function dateRangeQueryExclusive(from, to) {
    if (!from && !to)
        return null;
    if (from)
        from = new Date(from);
    if (to)
        to = new Date(to);
    return rangeQueryExclusive(from, to);
}



function rangeQueryExclusive(from, to) {
    if (!from && !to)
        return null;
    var result = {};
    if (from)
        result.$gt = from;
    if (to)
        result.$lt = to;
    return result;
}