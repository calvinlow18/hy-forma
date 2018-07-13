const dependencies = require("../../support/dependencies");
const forma = dependencies.forma;
const formaUtils = forma.utils;
const cleanEmpty = formaUtils.cleanEmpty;
describe("clean-empty", function () {

    it("1. cleaning empty object", function () {
        var object = {};
        cleanEmpty(object);
        expect(object).toEqual({});
    });

    it("2. cleaning filled object", function () {
        var object = {
            a: 123,
            b: 321
        };
        cleanEmpty(object);
        expect(object).toEqual({
            a: 123,
            b: 321
        });
    });
    it("3. cleaning filled object", function () {
        var object = {
            a: 123,
            b: 321,
            c: undefined,
            d: null,
            e: 0,
            f: false,
        };
        cleanEmpty(object);
        expect(object).toEqual({
            a: 123,
            b: 321,
            e: 0,
            f: false
        });
    });

    it("4. cleaning deep object, but only first level since this is not deep clean", function () {
        var object = {
            a: 123,
            b: 321,
            x: {
                y: {
                    z: {
                        a: 123,
                        b: null,
                    }
                }
            }
        };
        cleanEmpty(object);
        expect(object).toEqual({
            a: 123,
            b: 321,
            x: {
                y: {
                    z: {
                        a: 123,
                        b: null
                    }
                }
            }
        });
    });

});