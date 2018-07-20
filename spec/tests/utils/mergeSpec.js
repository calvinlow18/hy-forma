const dependencies = require("../../support/dependencies");
const forma = dependencies.forma;
const formaUtils = forma.utils;
const merge = formaUtils.merge;
describe("merge", function () {

    it("1. merging 2 simple object", function () {
        var a = {
            a: 123
        };
        var b = {
            b: 456
        };
        var result = merge(a, b);
        var expectation = {
            a: 123,
            b: 456
        };
        expect(result).toEqual(expectation);
    });

    it("2. merging 3 simple object", function () {
        var a = {
            a: 123
        };
        var b = {
            b: 456
        };
        var c = {
            c: 789
        };
        var result = merge(a, b, c);
        var expectation = {
            a: 123,
            b: 456,
            c: 789
        };
        expect(result).toEqual(expectation);
    });

    it("3. merging 2 complex object", function () {
        var a = {
            a: 123,
            c: {
                x: 123
            }
        };
        var b = {
            b: 123,
            d: {
                x: 123
            }
        };
        var result = merge(a, b);
        var expectation = {
            a: 123,
            b: 123,
            c: {
                x: 123
            },
            d: {
                x: 123
            }
        };
        expect(result).toEqual(expectation);
    });

    it("4. merging 2 complex object intersected", function () {
        var a = {
            a: 123,
            c: {
                x: 123
            }
        };
        var b = {
            b: 123,
            c: {
                x: 456,
                y: 456
            }
        };
        var result = merge(a, b);
        var expectation = {
            a: 123,
            b: 123,
            c: {
                x: 456,
                y: 456
            },
        };
        expect(result).toEqual(expectation);
    });

    it("4. merging 2 complex object intersected 2", function () {
        var a = {
            a: 123,
            c: {
                z: 123
            }
        };
        var b = {
            b: 123,
            c: {
                x: 456,
                y: 456
            }
        };
        var result = merge(a, b);
        var expectation = {
            a: 123,
            b: 123,
            c: {
                x: 456,
                y: 456,
                z: 123,
            },
        };
        expect(result).toEqual(expectation);
    });

    it("4. merging 2 complex object intersected with array", function () {
        var a = {
            a: 123,
            c: {
                z: 123
            },
            d: [1, 2, 3, 4]
        };
        var b = {
            b: 123,
            c: {
                x: 456,
                y: 456
            },
            d: [4, 5, 6]
        };
        var result = merge(a, b);
        var expectation = {
            a: 123,
            b: 123,
            c: {
                x: 456,
                y: 456,
                z: 123,
            },
            d: [4, 5, 6, 4]
        };
        expect(result).toEqual(expectation);
    });

});