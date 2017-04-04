const path = require("path"),
        fs = require("fs"),
        Doc = require("./libs/document"),
        printer = require("./libs/printer");

const VERSION = require("./package.json").version;

const _ARGV = {
    "t": true,
    "j": true,
    "p": true
}

const ARGV = {
    typescript: "t",
    javascript: "j",
    pug: "p"
};

let argv = process.argv[2],
    srcFolder  = process.argv[3] || "src",
    buildFolder  = process.argv[4] || "build",
    cwd = process.cwd();

if (false) {
    printer.printHelp();
    return;
}

// check input
if (typeof argv === "undefined" || argv[0] !== "-" || argv.length < 2) {
    printer.printHelp();
    return;
}

// sys cmd
if (argv == "-help" || argv == "-h") {
    printer.printHelp();
    return;
};

if (argv == "-version" || argv === "-v") {
    printer.printVersion();
    return;
};

// parse cmd arguments and check 
var options = {};
for (var i = 1; i < argv.length; i++) {
    if (!_ARGV[argv[i]]) {
        printer.printError("unknown option " + argv[i] + " ");
        return;
    }
    options[argv[i]] = true;
};

// check input 2

function generate (opt) {
    let doc = new Doc();

    doc.addLine('const gulp = require("gulp");');

    if (ARGV.typescript in opt) {
        doc.addLine('const ts = require("gulp-typescript");');
    }
    
    if (ARGV.pug in opt) {
        doc.addLine('const ts = require("gulp-pug");');
    }
    
    doc.breakLine();
    // start path
    doc.addLine("let path = {");

    // src: {...}
    doc.addTab();
    doc.addLine("src: {");
    doc.addTab();
    doc.addLine('view: "' + path.join(srcFolder, "view", "*.html") + '",');
    doc.addLine('style: "' + path.join(srcFolder, "style") + '",');
    doc.addLine('img: "' + path.join(srcFolder, "img", "**", "*.*") + '",');
    doc.addLine('fonts: "' + path.join(srcFolder, "fonts", "*.*") + '",');
    // js or typescript
    if (ARGV.typescript in opt || ARGV.javascript in opt) {
        doc.addLine('scripts: "' + path.join(srcFolder, "scripts", "*.*") + '",');
    }
    doc.removeTab();
    doc.addLine("},");

    // watch: {...}
    doc.addLine("watch: {");
    doc.addTab();
    doc.addLine('view: "' + path.join(srcFolder, "view" ,"**", "*.*") + '",');
    doc.addLine('style: "' + path.join(srcFolder, "style" ,"**", "*.scss") + '",');
    doc.addLine('img: "' + path.join(srcFolder, "img" ,"**", "*.*") + '",');
    doc.addLine('fonts: "' + path.join(srcFolder, "fonts" ,"**", "*.*") + '",');
    // js or typescript
    if (ARGV.typescript in opt) {
        doc.addLine('scripts: "' + path.join(srcFolder, "scripts" ,"**", "*.ts") + '",');
    } else {
        doc.addLine('scripts: "' + path.join(srcFolder, "scripts" ,"**", "*.js") + '",');
    }
    doc.removeTab();
    doc.addLine("},");

    // build: {...}
    doc.addLine("build: {");
    doc.addTab();
    doc.addLine('view: "' + path.join(buildFolder, "./") + '",');
    doc.addLine('style: "' + path.join(buildFolder, "css") + '",');
    doc.addLine('img: "' + path.join(buildFolder, "img") + '",');
    doc.addLine('fonts: "' + path.join(buildFolder, "fonts") + '",');
    doc.addLine('scripts: "' + path.join(buildFolder, "scripts") + '",');
    doc.removeTab();
    doc.addLine("}");

    // end path
    doc.removeTab();
    doc.addLine("};");
    
    fs.writeFile(path.join(cwd, "gulpfile.js"), doc.toString(), {encoding: "utf8"}, (err) => {
        if (err) throw err;
        console.log("Done");
    });
}

//run
generate(options);