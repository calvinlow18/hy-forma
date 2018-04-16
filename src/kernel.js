const DEFAULT_NAMESPACE = "default";
const DEFAULT_KERNEL_NAME = "default";
var debugHandler = null;
var kernels = {
    default: {}
};

module.exports = {
    init: init,
    bind: bind,
    use: use,
    namespace: namespace,
    resolve: resolve,
    kernels: kernels,
};

//#region public
function bind(name, handler, namespace, kernelName) {
    var kernel = getKernel(kernelName || DEFAULT_KERNEL_NAME);

    if (namespace) {
        var namespaceBindings = getNamespaceBindings(kernel, namespace);
        setNamespaceBinding(namespaceBindings, name, handler);
        debugHandler("binding dependency '" + name + "' in '" + namespace + "'");
    } else {
        var defaultBindings = getDefaultNamespaceBindings(kernel);
        setNamespaceBinding(defaultBindings, name, handler);
        debugHandler("binding dependency '" + name + "' in '" + DEFAULT_NAMESPACE + "'");
    }
};

function resolve(dependency, namespace, kernelName) {
    var kernel = getKernel(kernelName || DEFAULT_KERNEL_NAME);
    var defaultBindings = getDefaultNamespaceBindings(kernel);
    if (namespace) {
        var namespaceBindings = getNamespaceBindings(kernel, namespace);
        var handler = namespaceBindings[dependency];
        if (handler)
            return handler;
    }
    var handler = defaultBindings[dependency];
    if (!handler)
        throw new Error("Unable to resolve dependency '" + dependency + "' in '" + namespace + "'");
    debugHandler("resolved dependency '" + dependency + "' in '" + namespace + "'");
    return handler;

}

function init(config, name) {
    var name = name || DEFAULT_NAMESPACE;
    var config = config || {};
    debugHandler = config.debug || defaultDebugHandler;
    var kernel = {

    }

    kernels[name] = kernel;
    return use(name);
}

function use(kernelName) {
    return {
        namespace: kernelNamespace,
        bind: kernelBind,
        resolve: kernelResolve,
    }

    function kernelNamespace(name) {
        return namespace(name, kernelName)
    }

    function kernelBind(name, handler, namespace) {
        return bind(name, handler, namespace, kernelName)
    }

    function kernelResolve(namespace, dependency) {
        return resolve(dependency, namespace, kernelName, );
    }
};


function namespace(name, kernelName) {
    debugHandler("using namespace: " + name);
    return {
        resolve: namespaceResolve,
        bind: namespaceBind,
    }

    function namespaceResolve(dependency) {
        return resolve(dependency, name, kernelName);
    }

    function namespaceBind(bindingName, handler) {
        return bind(bindingName, handler, name, kernelName);
    }
}

//#endregion

//#region private
function getKernel(kernelName) {
    var kernel = kernels[kernelName];
    if (!kernel)
        throw new Error("kernel not found: " + kernelName);
    return kernel;
}

function getNamespaceBindings(kernel, namespace) {
    if (!kernel[namespace])
        kernel[namespace] = {};
    return kernel[namespace];
}

function getDefaultNamespaceBindings(kernel) {
    return getNamespaceBindings(kernel, DEFAULT_NAMESPACE)
}

function setNamespaceBinding(namespace, dependencyName, handler) {
    if (namespace[dependencyName])
        console.log("Replacing dependency '" + dependencyName);
    namespace[dependencyName] = handler;
}

function defaultDebugHandler() {};
//#endregion