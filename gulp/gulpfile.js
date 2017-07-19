const 
	gulp 			= require('gulp'),
	watch 			= require('gulp-watch'),
	sass 			= require('gulp-sass'),
	sourcemaps 		= require('gulp-sourcemaps'),
	cleanCSS 		= require('gulp-clean-css'),
	postCSS 		= require('gulp-postcss'),
	autoprefixer 	= require('autoprefixer'),
	uglify 			= require('gulp-uglify'),
	rename 			= require('gulp-rename'),
	imagemin 		= require('gulp-imagemin'),
	pngquant 		= require('imagemin-pngquant'),
	mozjpeg 		= require('imagemin-mozjpeg'),
	svgmin 			= require('gulp-svgmin'),
	svgstore 		= require('gulp-svgstore'),
	through2 		= require('through2'),
	cheerio 		= require('cheerio'),
	watchOptions 	= {
		verbose: true
	},
	paths 			= {
		sass: {
			watch: ['../scss/**/*.{sass,scss}'],
			dest: '../css'
		},

		css: {
			watch: '../css/app.css',
			dest: '../css'
		},

		js: {
			watch: ['./**/*.js', '!./gulpfile.js', '!./{core,components}/*', '!./*.min.js'],
			dest: './'
		},

		img: {
			watch: '../img-original/**/*.{jpg,jpeg,png}',
			dest: '../img'
		},

		svg: {
			watch: '../img-original/**/*.svg',
			dest: '../img',
			base: '../img-original'
		},

		icons: {
			watch: '../img-original/icons/*.svg',
			dest: '../img',
			base: '../img-original/icons'
		}
	},

	getDestFolder = file => {
		return file.path.split(/\\|\//g).filter((p, i, a) => i < a.length - 1).join('/');
	}
;

gulp.task('sass', () => {
	return watch(paths.sass.watch, watchOptions, file => {
		var compile = (src, dest) => {
			return gulp.src(src)
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
			.pipe(gulp.dest(dest));
		};

		var dest = getDestFolder(file).replace(/\/scss\//, '/css/');

		compile(paths.app.scss, paths.sass.dest);
		compile(file.path, dest);
	})
});

gulp.task('minify-css', () => {
	return watch(paths.css.watch, watchOptions, file => {
		gulp.src(file.path)
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.css.dest));
	})
});

gulp.task('minify-js', () =>  {
	return watch(paths.js.watch, watchOptions, file => {
		var dest = getDestFolder(file);

		gulp.src(file.path)
		.pipe(uglify())        
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(dest));
	})
});

gulp.task('imagemin', () => {
	return watch(paths.img.watch, watchOptions, file => {
		var dest = getDestFolder(file).replace(/img-original/g, 'img');

		gulp.src(file.path)
		.pipe(imagemin({
			use: [
				pngquant(), 
				mozjpeg()
			],
		}))
		.pipe(gulp.dest(dest));
	})
});

gulp.task('svgmin', () => {
	return watch(paths.svg.watch, watchOptions, file => {
		gulp.src(paths.svg.watch, { base: paths.svg.base })
		.pipe(svgmin())
		.pipe(gulp.dest(paths.svg.dest));	
	});
});

gulp.task('svg-sprites', () => {
	return watch(paths.icons.watch, watchOptions, file => {		
		gulp.src(paths.icons.watch, { base: paths.icons.base })
		.pipe(svgmin())
		.pipe(svgstore({inlineSvg: true}))
		.pipe(through2.obj(function (file, encoding, cb) {
			var $ = cheerio.load(file.contents.toString(), {xmlMode: true});
			$('svg').css({
				position: 	'absolute',
				top: 		'-100%',
				left: 		'-100%',
				width: 		'0',
				height: 	'0'
			});

			file.contents = new Buffer($.html());
			this.push(file);
		}))
		.pipe(gulp.dest(paths.icons.dest)); 
	})
})

gulp.task('default', ['sass', 'minify-css', 'minify-js', 'imagemin', 'svgmin', 'svg-sprites']);