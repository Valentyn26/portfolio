import { parallel, series, task, watch } from 'gulp';

import { copy } from './tasks/copy.js';
import { reset } from './tasks/reset.js';
import { html } from './tasks/html.js';
import { css } from './tasks/scss.js';
import { js } from './tasks/js.js';
import { server } from './tasks/server.js';
import { images } from './tasks/images.js';
//import { otfToTtf, ttfToWoff, fontsStyle } from './tasks/fonts.js';

function watcher() {
    watch('./src/files/**/*.*', copy);
    watch('./src/**/*.html', html);
    watch('./src/scss/**/*.scss', css);
    watch('./src/js/**/*.js', js);
    watch('./src/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', images);
}

//const fonts = series(otfToTtf, ttfToWoff, fontsStyle);

//const htmlTask = series(fonts, parallel(copy, html, css, js, images));
const htmlTask = parallel(copy, html, css, js, images);

const dev = series(reset, htmlTask, parallel(watcher, server));

task('default', dev);