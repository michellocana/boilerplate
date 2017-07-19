const
	gulp 	= require('gulp'),
	watch 	= require('gulp-watch'),
	svgmin 	= require('gulp-svgmin')
;

gulp.task('svgmin', () => {
	return watch('src/svg', watchOptions, file => {
		gulp.src(file.path, { base: 'src/svg' })
		.pipe(svgmin())
		.pipe(gulp.dest('dist/svg'));	
	});
});