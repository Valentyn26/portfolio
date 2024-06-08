import { src, dest } from 'gulp';
import fileinclude from 'gulp-file-include';
import replace from 'gulp-replace';
import webp from 'gulp-webp-html-nosvg';
import browserSync from "browser-sync";
// import pug from "gulp-pug";

export function html() {
    return src('./src/*.html')
        .pipe(fileinclude())
        .pipe(replace("@img/", 'img/'))
        .pipe(webp())
        // .pipe(pug({
        //     pretty: true,
        //     verbose: true
        // }))
        .pipe(dest(`./dest/`))
        .pipe(browserSync.stream());
}