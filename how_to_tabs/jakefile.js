/* globals jake: false, desc: false, task: false, require: false, fail: false, complete: false */
(function () {
    "use strict";

    var packageJson = require("./package.json");
    var semver = require("semver");
    var jshint = require("simplebuild-jshint");

    //**** General-purpose tasks 

    desc("Default build");
    task("default", ["node version", "npm version", "lint", "run"], function () {

        console.log("\n\nBUILD OK");
    });

    desc("Run a Localhost server");
    task("run", function () {

        jake.exec("node node_modules\\http-server\\bin\\http-server src", { interactive: true }, complete);

    }, { async: true });

    //**** Supporting tasks

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

        process.stdout.write("Linting JavaScript: "); // This command is used ,so that the dot from jshint is added to the same line as "Linting JavaScript" output.

        jshint.checkFiles({
            files: "Jakefile.js",
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                futurehostile: true,
                latedef: "nofunc",
                leanswitch: true,
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                strict: true,
                undef: true,
                node: true,
                browser: true,
                noreturnawait: true,
            },
            globals: {}
        }, complete, fail);

    }, { async: true });


}());