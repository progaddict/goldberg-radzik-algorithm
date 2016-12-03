'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';

const dirs = {
    src: 'src',
    test: 'test',
    build: 'dist'
};

gulp.task('default', () => {
    return gulp.src(`${dirs.src}/**/*.js`)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest(dirs.build));
});
