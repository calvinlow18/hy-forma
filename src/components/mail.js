const nodemailer = require("nodemailer");
const stringRender = require("../utils/string-render");

module.exports = function mail(settings) {
    var host = settings.host;
    var port = settings.port;
    var secure = settings.secure;
    var auth = settings.auth;
    var from = settings.from;
    var presetTemplate = settings.template;

    var transporterSettings = {
        host: host,
        port: port,
        secure: secure
    };
    if (auth)
        transporterSettings.auth = auth;

    async function send(options) {
        if (!options)
            throw Error("missing options");
        var template = presetTemplate || options.template;
        if (template && options.data && !options.html) {
            var data = options.data;
            delete(options.data);
            delete(options.template);
            var html = stringRender(template, data);
            options.html = html;
        }
        var mailSettings = {};
        Object.assign(mailSettings, options);
        if (!mailSettings.from)
            mailSettings.from = from;

        var transporter = createInstance();
        return new Promise(function (resolve, reject) {
            transporter.sendMail(mailSettings, function (error, info) {
                if (error)
                    return reject(error);
                info.settings = mailSettings;
                return resolve(info);
            })
        });
    }

    function createInstance(options) {
        var instanceSettings = {};
        var options = options || {}
        Object.assign(instanceSettings, transporterSettings);
        Object.assign(instanceSettings, options);
        return nodemailer.createTransport(instanceSettings);
    }

    return {
        settings: transporterSettings,
        instance: createInstance,
        send: send
    }
}