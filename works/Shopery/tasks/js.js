import { src, dest } from 'gulp';
import webpack from 'webpack-stream';

export function js() {
    return src(`./src/js/app.js`)
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(dest(`./dest/js/`))
}