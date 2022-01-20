const gulp = require('gulp');
const scss = require('gulp-sass')(require ('sass'));
const autoprefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require ('gulp-imagemin');
const svgo = require ('gulp-svgo');
const svgSprite = require('gulp-svg-sprites');
const pngSprite = require('gulp.spritesmith');
const del = require('del');
const { render } = require('sass');
const include = require('gulp-include');


// BrowserSync инициализация
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/',
        },
        notify: false,
    });
});


// BrowserSync для HTML
gulp.task('htmlProd', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
})

gulp.task('htmlDev', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
})


// CSS компилятор
// Для команды gulp prod
gulp.task('scssProd', function() {
    return gulp.src('src/css/styles.scss')
        .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        .pipe(autoprefix(['last 5 versions']))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(gulp.dest('dist/css'))
})

// Для команды gulp dev
gulp.task('scssDev', function() {
    return gulp.src('src/css/styles.scss')
        .pipe(scss({
            outputStyle: 'expanded',
            indentWidth: 4,
        }))
        .pipe(autoprefix(['last 5 versions']))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
})


// Минификация JS
gulp.task('js', function() {
    return gulp.src([
        //'src/js/**/*.js',
        'src/js/main.js',
    ])
    .pipe(include({
        extensions: 'js',
        hardFail: true,
        includePaths: [
            __dirname + '/node_modules',

          ]
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
})



// Шрифты
gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})



// Минификация jpeg, png
gulp.task('imgMin', function() {
    return gulp.src('src/images/*.{jpg,png}')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('dist/images/'));
})



// Минификация svg
gulp.task('svgMin', function() {
    return gulp.src('src/images/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('dist/images/'));
})

// Video
gulp.task('videos', function() {
    return gulp.src('src/videos/*.mp4')
        .pipe(gulp.dest('dist/videos/'));
})


// Watch
gulp.task('watch', function() {
	gulp.watch('src/css/**/*.scss', gulp.parallel('scssDev'));
	gulp.watch('src/js/**/*.js', gulp.parallel('js'));
	gulp.watch('src/*.html', gulp.parallel('htmlDev'));
});


// Удаление файлов/папок
gulp.task('del', function() {
    return del.sync(['dist/**']); 
})


// Команда для разработки
gulp.task('dev', gulp.parallel('htmlDev', 'scssDev', 'watch', 'browserSync'));

// Команда сборки
gulp.task('prod', gulp.parallel('htmlProd', 'scssProd', 'js', 'fonts', 'videos', 'imgMin', 'svgMin'));


gulp.task('default', gulp.parallel('dev'));