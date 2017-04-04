const path = require("path"),
        fs = require("fs"),
        Doc = require("./libs/document");

const ARGV = {
    typescript: "t",
    javascript: "j",
    pug: "p"
};

const VERSION = require("./package.json").version;

let type = process.argv[2],
    srcFolder  = process.argv[3] || "src",
    buildFolder  = process.argv[4] || "build",
    cwd = process.cwd();




if (type == "-help" || typeof type === "undefined") {
    printHelp();
    return;
};

if (type == "-version") {
    printVersion();
    return;
};

var options = {};

for (var i = 0; i < type.length; i++) {
    options[type[i]] = true;
};

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
    doc.addLine('scripts: "' + path.join(srcFolder, "scripts", "*.*") + '",');
    doc.removeTab();
    doc.addLine("},");

    // watch: {...}
    doc.addLine("watch: {");
    doc.addTab();
    doc.addLine('view: "' + path.join(srcFolder, "view" ,"**", "*.*") + '",');
    doc.addLine('style: "' + path.join(srcFolder, "style" ,"**", "*.scss") + '",');
    doc.addLine('img: "' + path.join(srcFolder, "img" ,"**", "*.*") + '",');
    doc.addLine('fonts: "' + path.join(srcFolder, "fonts" ,"**", "*.*") + '",');
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

function printHelp() {
    console.log("HELP");
}

function printVersion() {
    console.log("version %s", VERSION);
}

//run
generate(options);