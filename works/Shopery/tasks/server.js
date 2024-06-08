import browserSync from "browser-sync";

export const server = (done) => {
    browserSync.init({
        server: {
            baseDir: `./dest/`
        },
        notify: false,
        port: 3000,
    })
}