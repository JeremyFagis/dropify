var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    meta = require('./package.json');

var jsDir     = 'src/js/',
    sassDir   = 'src/sass/',
    fontsDir  = 'src/fonts/',
    distDir   = 'dist',
    banner    = [
        '/*!',
        ' * =============================================================',
        ' * <%= name %> v<%= version %> | <%= description %>',
        ' * <%= homepage %>',
        ' *',
        ' * (c) 2015 <%= author.name %> <<%= author.email %>> | <%= author.url %>',
        ' * =============================================================',
        ' */\n\n'
    ].join('\n');


var onError = function (err) {
    $.util.beep();
    console.log(err.toString());
    this.emit('end');
};

gulp.task('fonts', function() {
    return gulp.src(fontsDir + '**/*')
        .pipe(gulp.dest(distDir + "/fonts"));
});

gulp.task('sass-dev', function() {
    return gulp.src(sassDir + '*.scss')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(distDir + "/css"));
});
gulp.task('sass-prod', function() {
    return gulp.src(sassDir + '*.scss')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.minifyCss())
        .pipe(gulp.dest(distDir + "/css"));
});

gulp.task('scripts-dev', function() {
    return gulp.src([jsDir + '*.js'])
        .pipe(gulp.dest(distDir + "/js"))
        .pipe($.umd())
        .pipe($.header(banner, meta))
        .pipe(gulp.dest(distDir + "/js"));
});
gulp.task('scripts-prod', function() {
    return gulp.src([jsDir + '*.js'])
        .pipe(gulp.dest(distDir + "/js"))
        .pipe($.umd())
        .pipe($.header(banner, meta))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir + "/js"));
});



gulp.task('watch', ['sass-dev', 'scripts-dev', 'fonts'], function() {
    gulp.watch(jsDir + '**/*.js', ['scripts-dev']);
    gulp.watch(sassDir + '**/*.scss', ['sass-dev']);
});
gulp.task('default', ['sass-prod', 'scripts-prod', 'fonts']);
gulp.task('prod',    ['sass-prod', 'scripts-prod', 'fonts']);
