const
	gulp 		= require('gulp'),
	watch 		= require('gulp-watch'),
	imagemin 	= require('gulp-imagemin'),
	pngquant 	= require('imagemin-pngquant'),
	mozjpeg 	= require('imagemin-mozjpeg')
;

gulp.task('imagemin', () => {
	return watch('img-original', {
		verbose: true
	}, file => {
		gulp.src(file.path)
		.pipe(imagemin({
			use: [
				pngquant(), 
				mozjpeg()
			],
		}))
		.pipe(gulp.dest('img'));
	})
});