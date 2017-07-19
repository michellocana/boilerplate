const
	gulp 	= require('gulp'),
	watch 	= require('gulp-watch'),
	uglify 	= require('gulp-uglify'),
	rename 	= require('gulp-rename')
;

gulp.task('minify-js', () =>  {
	return watch('src/js', watchOptions, file => {
		gulp.src(file.path)
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/js'));
	});
});