'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('build', () => {
	return gulp.src('src/*.scss')
		.pipe(concat('spartan.scss'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
	return watch('src/*.scss', () => {
		gulp.start('build');
	});
});

gulp.task('dev', ['build', 'watch']);
