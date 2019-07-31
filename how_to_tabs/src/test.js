(function () {
    "use strict";

    var assert = require("chai").assert;

    assert.equal(7, add(3, 4),"Expected " + 7 + " , but was " + add(3, 4));

    function add(a, b) {

        return a - b;
    }

}());