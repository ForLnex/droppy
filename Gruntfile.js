"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        bump: {
            options: {
                files: ["package.json"],
                commit: true,
                commitMessage: "Release %VERSION%",
                commitFiles: ["-a"],
                createTag: true,
                tagName: "%VERSION%",
                tagMessage: "Version %VERSION%",
                push: false,
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: true
            },
            push: {
                command: "git push -u -f --tags origin master"
            },
            publish: {
                command: "npm publish"
            },
            update: {
                command: "npm-check-updates -u"
            },
            modules: {
                command: "rm -rf node_modules && npm install"
            },
            jitsu : {
                command: "jitsu login && jitsu deploy && jitsu logs tail"
            },
            heroku : {
                command: "git push -u -f --tags heroku master"
            }
        }
    });

    grunt.registerTask("update",  ["shell:update", "shell:modules"]);
    grunt.registerTask("release", ["bump", "shell:push", "shell:publish", "shell:heroku", "shell:jitsu"]);
    grunt.registerTask("minor",   ["bump:minor", "shell:push", "shell:publish"]);
    grunt.registerTask("major",   ["bump:major", "shell:push", "shell:publish"]);
    grunt.registerTask("deploy",  ["shell:heroku", "shell:jitsu"]);


    grunt.loadNpmTasks("grunt-bump");
    grunt.loadNpmTasks("grunt-shell");
};
