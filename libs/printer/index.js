module.exports = {
    printHelp: function () {
        console.log("\x1b[0m", "usage:   sigu -argv [src] [build]", "\x1b[0m");
        console.log("\x1b[0m", "default: src   = cwd + /src");
        console.log("\x1b[0m", "         build = cwd + /build");
        console.log("\x1b[0m", "example: sigu -tp");
        console.log("\x1b[0m", "argv: t: typescript");
        console.log("\x1b[0m", "      j: javascript");
        console.log("\x1b[0m", "      p: pug");
    },

    printVersion: function (version) {
        console.log("\x1b[0m", "version " + version);
    },

    printError: function(msg) {
        console.log("\x1b[31m", msg, "\x1b[0m");
        console.log("\x1b[0m", "type sigu -h or sigu -help for help");
    }
}