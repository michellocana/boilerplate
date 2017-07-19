const
	gulp 		= require('gulp'),
	watch 		= require('gulp-watch'),
	cleanCSS 	= require('gulp-clean-css'),
	rename 		= require('gulp-rename')
;

gulp.task('minify-css', () => {
	return watch('src/css', {
		verbose: true
	}, file => {
		gulp.src(file.path)
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'));
	});
});