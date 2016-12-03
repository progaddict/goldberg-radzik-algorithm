'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

const dirs = {
    src: 'src',
    test: 'test',
    build: 'dist'
};

gulp.task('build', () => {
    return gulp.src(`${dirs.src}/**/*.js`)
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-amd']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dirs.build));
});
