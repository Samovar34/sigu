const gulp = require("gulp");
const ts = require("gulp-pug");

let path = {
    src: {
        view: "src/view/*.html",
        style: "src/style",
        img: "src/img/**/*.*",
        fonts: "src/fonts/*.*",
        scripts: "src/scripts/*.*",
    },
    watch: {
        view: "src/view/**/*.*",
        style: "src/style/**/*.scss",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*",
        scripts: "src/scripts/**/*.js",
    },
    build: {
        view: "build/",
        style: "build/css",
        img: "build/img",
        fonts: "build/fonts",
        scripts: "build/scripts",
    }
};
