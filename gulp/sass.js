const
	gulp 			= require('gulp'),
	watch 			= require('gulp-watch'),
	sass 			= require('gulp-sass'),
	sourcemaps 		= require('gulp-sourcemaps'),
	postCSS 		= require('gulp-postcss'),
	autoprefixer 	= require('autoprefixer')
;

gulp.task('sass', () => {
	return watch('src/sass', {
		verbose: true
	}, file => {
		gulp.src(file.path)
		.pipe(sourcemaps.init())
		.pipe(sass({
			indentType: 'tab',
			indentWidth: 1
		}))
		.on('error', sass.logError)
		.pipe(postCSS([ autoprefixer({
			browsers: ['last 2 version' , 'ie 9', '> 1%']
		}) ]))
		.pipe(sourcemaps.write())		
		.pipe(gulp.dest('dist/css'));
	});
});