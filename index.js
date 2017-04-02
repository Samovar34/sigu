const path = require("path"),
        fs = require("fs");

const ARGV = {
    typescript: "t",
    javascript: "j",
    pug: "p"
}

let type = process.argv[2],
    srcFolder  = process.argv[3] || "src",
    buildFolder  = process.argv[4] || "build",
    cwd = process.cwd();

let result = "";
let tab = "";


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

var headerAtions = {
    "t": function () { line('const ts = require("gulp-typescript");');},
    "p": function () { line('const pug = require("gulp-pug");');},
    default: () => {}
}

var pathAtions = {
    "p": function () { line('const pug = require("gulp-pug");');},
    default: () => {}
}

console.log(options);

function generate (opt) {
    let key = null;
    startLine();
    line('const gulp = require("gulp");');
    
    for (key in opt) {
        if (typeof headerAtions[key] === "function") {
            headerAtions[key]();
        }
    }
    key = null;
    
    line("");
    // start path
    line("let path = {");

    // src: {...}
    addTab();
    line("src: {");
    addTab();
    line('view: "' + path.normalize(path.join(srcFolder, "view", "*.html")) + '",');
    line('style: "' + path.normalize(path.join(srcFolder, "style")) + '",');
    line('img: "' + path.normalize(path.join(srcFolder, "img", "**", "*.*")) + '",');
    line('fonts: "' + path.normalize(path.join(srcFolder, "fonts", "*.*")) + '",');
    line('scripts: "' + path.normalize(path.join(srcFolder, "scripts", "*.*")) + '",');
    removeTab();
    line("},");

    // watch: {...}
    line("watch: {");
    addTab();
    line('view: "' + path.normalize(path.join(srcFolder, "view" ,"**", "*.*")) + '",');
    line('style: "' + path.normalize(path.join(srcFolder, "style" ,"**", "*.scss")) + '",');
    line('img: "' + path.normalize(path.join(srcFolder, "img" ,"**", "*.*")) + '",');
    line('fonts: "' + path.normalize(path.join(srcFolder, "fonts" ,"**", "*.*")) + '",');
    if (opt[ARGV.typescript]) {
        line('scripts: "' + path.normalize(path.join(srcFolder, "scripts" ,"**", "*.ts")) + '",');
    } else {
        line('scripts: "' + path.normalize(path.join(srcFolder, "scripts" ,"**", "*.js")) + '",');
    }
    removeTab();
    line("},");

    // build: {...}
    line("build: {");
    addTab();
    line('view: "' + path.normalize(path.join(buildFolder, "./")) + '",');
    line('style: "' + path.normalize(path.join(buildFolder, "css")) + '",');
    line('img: "' + path.normalize(path.join(buildFolder, "img")) + '",');
    line('fonts: "' + path.normalize(path.join(buildFolder, "fonts")) + '",');
    line('scripts: "' + path.normalize(path.join(buildFolder, "scripts")) + '",');
    removeTab();
    line("}");

    // end path
    removeTab();
    line("};");
    
    console.log(result);

    fs.writeFile(path.join(cwd, "gulpfile.js"), result, {encoding: "utf8"}, (err) => {
        if (err) throw err;
        console.log("Done");
    })
}


function startLine() {
    if (typeof result !== "string") {
        result = "";
    }
}

// добавить 1 отступ
function addTab() {
    tab += "    ";
}

// убрать 1 отступ
function removeTab() {
    if (tab.length >= 3) {
        tab = tab.slice(0, -4);
    } else {
        tab = "";
    }
}

// добавить строку
function line(text) {
    result += tab + text + "\n";
}

function printHelp() {
    console.log("HELP");
}

function printVersion() {
    console.log("version 0.0.1");
}

//run
generate(options);