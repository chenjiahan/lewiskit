var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

var autoprefixerConfig = {
    browsers: ['Android >= 2.3', 'iOS >= 6', 'last 2 Chrome versions', 'last 2 Safari versions']
};

var path = {
    js  : 'src/js/index.js',
    less: 'src/style/index.less',
    html: 'src/index.html'
};

gulp.task('less', function() {
    gulp.src(path.less)
        .pipe(changed('dist'))
        .pipe(less())
        .pipe(autoprefixer(autoprefixerConfig))
        .pipe(csso())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
    gulp.src(path.html)
        .pipe(changed('dist'))
        .pipe(htmlmin({
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function() {
    gulp.src(path.js)
        .pipe(changed('dist'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
    gulp.watch(path.less, ['js']);
    gulp.watch(path.less, ['less']);
    gulp.watch(path.html, ['html']);
});

gulp.task('clean', function() {
    del(['dist']);
});

gulp.task('default', ['watch', 'js', 'less', 'html']);
