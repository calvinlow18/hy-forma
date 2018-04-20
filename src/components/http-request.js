const request = require("request");
const url = require("../utils/url");
const combine = require("../utils/combine");

module.exports = http;


function http(endpoint, options) {
    if (!endpoint)
        return null;

    var options = options || {};
    var defaultHeaders = options.headers;
    var defaultQuery = options.query;

    return {
        post: post,
        get: get,
        put: put,
        delete: del,
        send: send,
    }

    async function send(settings) {
        settings = settings || {};
        var extendSetting = settings.extendSetting || function () {};

        var targetUrl = settings.url || "";
        var data = settings.data;
        var headers = settings.headers || {};
        var query = settings.query;
        var method = (settings.method || "GET").toUpperCase();

        var combinedHeaders = combine(defaultHeaders, headers);
        var combinedQuery = combine(defaultQuery, query);
        var finalUrl = url(endpoint, targetUrl);
        var stringQuery = createStringQuery(combinedQuery);
        if (stringQuery != "")
            finalUrl += "?" + stringQuery;

        var requestSettings = {
            url: finalUrl,
            method: method,
            headers: combinedHeaders,
        }

        if (typeof (data) == "object")
            requestSettings.json = data;

        extendSetting(requestSettings);

        var result = new Promise(function (resolve, reject) {
            request(requestSettings, function (error, response, body) {
                if (error)
                    return reject(err);
                resolve(body);
            });
        });
        return await result;
    }

    async function post(data, targetUrl, options) {
        options = options || {};
        targetUrl = targetUrl || "";
        return await send(combine(options, {
            data: data,
            url: targetUrl,
            method: "POST"
        }))
    }

    async function get(targetUrl, query, options) {
        query = query || {};
        options = options || {};
        targetUrl = targetUrl || "";
        return await send(combine(options, {
            query: query,
            url: targetUrl,
            method: "GET",
        }))

    }

    async function put(data, targetUrl, options) {
        options = options || {};
        targetUrl = targetUrl || "";
        return await send(combine(options, {
            data: data,
            url: targetUrl,
            method: "PUT",
        }))

    }

    async function del(targetUrl, options) {
        options = options || {};
        targetUrl = targetUrl || "";
        return await send(combine(options, {
            url: targetUrl,
            method: "DELETE"
        }))

    }


}

function createStringQuery(query) {
    var result = "";
    for (var i in query) {
        if (result != "")
            result += "&";
        result += i + "=" + query[i];
    }
    return result;
}