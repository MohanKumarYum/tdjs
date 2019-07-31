(function () {
    "use strict";

    var a = 3, b = 4;
    var expected = 7;
    var actual = add(a, b);

    assertEqual(actual, expected);

    function assertEqual(actual, expected) {

        try {
            if (actual !== expected) {
                throw new Error("Expected " + expected + " , but was " + actual);
            }

        } catch (error) {
            console.log(error);
        }
    }

    function add(a, b) {

        return a - b;
    }

}());