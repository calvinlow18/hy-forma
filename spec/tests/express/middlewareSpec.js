const dependencies = require("../../support/dependencies");
const forma = dependencies.forma;
const hyMiddleware = forma.express.middleware;

function express() {
    var routings = [];
    return {
        use,
        routings,
        get,
        post,
        put,
        delete: del,
    }

    function use(endpointOrHandler, handler, method) {
        var endpoint = handler ? endpointOrHandler : "/";
        var handler = handler || endpointOrHandler;
        var routing = {
            route: endpoint,
            handlerLength: handler.length,

        };
        if (method)
            routing.method = method;
        routings.push(routing);
    }

    function get(endpointOrHandler, handler) {
        use(endpointOrHandler, handler, "get");
    }

    function post(endpointOrHandler, handler) {
        use(endpointOrHandler, handler, "post");
    }

    function put(endpointOrHandler, handler) {
        use(endpointOrHandler, handler, "put");
    }

    function del(endpointOrHandler, handler) {
        use(endpointOrHandler, handler, "delete");
    }
}

describe("express.middleware", function () {
    it("1. simple middleware only", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [simpleFunction]);
        expect(mockRoutings).toEqual([{
            route: "/",
            handlerLength: 1,
        }])
    });
    it("2. multiple route for single middleware", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: ["/1", "/2"],
            handler: simpleFunction
        }]);
        expect(mockRoutings).toEqual([{
            route: "/1",
            handlerLength: 1
        }, {
            route: "/2",
            handlerLength: 1
        }, ])
    });
    it("3. single route for multiple middleware", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: "/1",
            handler: [simpleFunction, () => {}]
        }]);
        expect(mockRoutings).toEqual([{
            route: "/1",
            handlerLength: 2
        }, ])
    });
    it("3. multiple route for multiple middleware", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: ["/1", "/2"],
            handler: [simpleFunction, () => {}]
        }]);
        expect(mockRoutings).toEqual([{
            route: "/1",
            handlerLength: 2
        }, {
            route: "/2",
            handlerLength: 2
        }, ])
    });
    it("5. get simple middleware only", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: "/",
            handler: simpleFunction,
            method: "get"
        }]);
        expect(mockRoutings).toEqual([{
            route: "/",
            handlerLength: 1,
            method: "get",
        }])
    });
    it("6. post simple middleware only", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: "/",
            handler: simpleFunction,
            method: "post"
        }]);
        expect(mockRoutings).toEqual([{
            route: "/",
            handlerLength: 1,
            method: "post",
        }])
    });
    it("7. put simple middleware only", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: "/",
            handler: simpleFunction,
            method: "put"
        }]);
        expect(mockRoutings).toEqual([{
            route: "/",
            handlerLength: 1,
            method: "put",
        }])
    });
    it("8. delete simple middleware only", function () {
        var mockExpress = express();
        var mockRoutings = mockExpress.routings;

        var simpleFunction = function () {}
        hyMiddleware(mockExpress, [{
            route: "/",
            handler: simpleFunction,
            method: "delete"
        }]);
        expect(mockRoutings).toEqual([{
            route: "/",
            handlerLength: 1,
            method: "delete",
        }])
    });
});