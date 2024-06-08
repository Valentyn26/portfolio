import { src, dest } from 'gulp';

export function copy() {
    return src(`./src/files/**/*.*`)
        .pipe(dest(`./dest/files/`))
}