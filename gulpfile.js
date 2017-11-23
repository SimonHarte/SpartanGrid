'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('compile', () => {
	return gulp.src('grid-setup.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('grid.css'))
		.pipe(gulp.dest('./'));
});

gulp.task('compile-test', () => {
	return gulp.src('tests/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('tests.css'))
		.pipe(gulp.dest('./'));
});

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
