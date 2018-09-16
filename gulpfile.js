var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['chrome > 0', 'ie > 0', 'firefox > 0']
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('icon/*.png')
        .pipe(spritesmith({
            padding: 10,
            imgName: 'sp_icon.png',
            cssName: '_sp_icon.scss',
            imgPath: '../img/sprites/sp_icon.png'
        }));
    var imgStream = new Promise(function (resolve) {
        spriteData.img
            .pipe(buffer())
            .pipe(imagemin())
            .pipe(gulp.dest('src/img/sprites/'))
            .on('end', resolve)
    });
    var cssStream = new Promise(function (resolve) {
        spriteData.css
            .pipe(gulp.dest('src/scss/import/sprites/'))
            .on('end', resolve)
    });

    return Promise.all([imgStream, cssStream]);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default',
    ['watch']
);