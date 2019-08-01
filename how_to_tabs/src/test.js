(function() {
    "use strict";

    var chai = require("chai");
    var assert = chai.assert;

    // basic addition
    assert.equal(7, add(3, 4));

    // IEEE 754 floating point
    assert.equal(0.30000000000000004, add(0.1,0.2));

    function add(a, b) {
        return a + b;
    }
}());