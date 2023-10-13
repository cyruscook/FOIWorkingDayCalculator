var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass')),
    nunjucksRender = require('gulp-nunjucks-render'),
    webpack = require('webpack-stream');


function sass_task() {
    return gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
};

function scripts() {
    return gulp.src([
        'src/js/*.js',
        './node_modules/govuk-frontend/govuk/all.js'])
        .pipe(webpack(require('./webpack.config.js'), require('webpack')))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
};

function nunjucks() {
    return gulp.src('src/html/pages/**/*.html')
        .pipe(nunjucksRender({
            path: ['src/html', 'node_modules/govuk-frontend/']
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
};

// Create a task that ensures the `nunjucks` task is complete before reloading browsers.
const nunjucksHtmlWatch = gulp.series(nunjucks, function () {
    browserSync.reload();
});

// Static Server + watching scss/html files.
const serve = gulp.parallel(sass_task, nunjucksHtmlWatch, function () {
    browserSync.init({
        server: './build'
    });

    gulp.watch('src/css/*.scss', sass_task);
    gulp.watch('src/js/*.js', scripts);
    gulp.watch('webpack.config.js', scripts);
    gulp.watch('src/html/**/*.html', nunjucks);
});

function images() {
    return gulp.src('img/**')
        .pipe(gulp.dest('build/img'))
};

const miscFiles = gulp.parallel(function () {
    return gulp.src(["node_modules/govuk-frontend/govuk/assets/**"])
        .pipe(gulp.dest('build/assets'));
}, function () {
    return gulp.src("src/css/*.css")
        .pipe(gulp.dest('build/css'));
});

// Compile project.
exports.build = gulp.parallel(sass_task, images, scripts, nunjucks, miscFiles);

// Compile and start project.
exports.serve = gulp.series(exports.build, serve);
