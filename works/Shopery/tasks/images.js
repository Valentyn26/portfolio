import { src, dest } from 'gulp';
import webp from 'gulp-webp';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import newer from 'gulp-newer';

export function images() {
    return src('./src/img/**/*.{jpg,jpeg,png,gif,webp}')
        // .pipe(newer('./dest/img/'))
        // .pipe(webp())
        // .pipe(dest('./dest/img/'))
        // .pipe(src('./src/img/**/*.{jpg,jpeg,png,gif,webp}'))
        // .pipe(newer('./dest/img/'))
        // .pipe(imagemin([
        //     gifsicle({ interlaced: true }),
        //     mozjpeg({ progressive: true }),
        //     optipng({ optimizationLevel: 3 }),
        //     svgo({
        //         plugins: [
        //             {
        //                 name: 'removeViewBox',
        //                 active: true
        //             }
        //         ]
        //     })
        // ]))
        .pipe(dest('./dest/img/'))
        .pipe(src('./src/img/**/*.svg'))
        .pipe(dest('./dest/img/'));
}