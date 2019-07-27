(function () {
    "use strict";

    var packageJson = require("./package.json");

    var semver = require("semver");

    var exec = require("child_process");


    desc("Default build");
    task("default", ["node version", "npm version"], function () {

        console.log("\n\nBUILD OK");
    });


    desc("Check Node Version");
    task("node version", function () {

        console.log("Checking node version: .");

        var expectedNodeVersion = packageJson.engines.node;

        var actualNodeVersion = semver.clean(process.version); // Refer node process. [ https://nodejs.org/api/process.html ]

        if (semver.neq(actualNodeVersion, expectedNodeVersion)) {
            var errMsg = "Incorrect Node Version : " + "actual node version : " + actualNodeVersion + " , but expected node version: " + expectedNodeVersion + " [http://nodejs.org/dist/v0.12.4/]";
            fail(errMsg);
        }
    });

    desc("Check npm version");
    task("npm version", function () {
        console.log("Checking npm version: .");

        var expectedVersion = packageJson.engines.npm;

        var exec = require("child_process").exec;
        exec("npm -v", function (error, stdout, stderr) {
            var actualVersion = stdout;
            if (semver.neq(expectedVersion, actualVersion)) {
                fail("Incorrect npm version: expected " + expectedVersion + ", but was " + actualVersion);
            }
            complete();
        });
    }, { async: true });

    desc("Linting JavaScript code");
    task("lint", function () {
        
        console.log("Linting JavaScript: .");
        jake.exec("node node_modules\\jshint\\bin\\jshint jakefile.js", { interactive: true }, complete);

    }, { async: true });


}());