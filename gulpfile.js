var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var htmlreplace = require('gulp-html-replace');


/*clean task -- deletes all files in the*/
gulp.task('clean', function() {
    gulp.src([
        './dist/*'
    ])
        .pipe(clean({force: true}));
});

/*lint task -- checks javascripts for errors*/
gulp.task('lint', function() {
    gulp.src([
        './public/javascripts/paworclaw.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});


/*minfiy-css -- compiles less files, adds browser prefixes, minifies the css */
gulp.task("css", function() {
    var opts = {comments:true,spare:true};
    gulp.src([
        './public/stylesheets/*.css',
    ])
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/stylesheets'));
});

/* concats, and minifies settings-app files */
gulp.task('javascripts', function() {
    gulp.src([
        "public/javascripts/*.js"
    ])
        //.pipe(concat("paworclaw.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/javascripts/'));
});


/*minify-images -- minfies images and puts in proper folder*/
gulp.task('minify-images', function () {

    /*minify images that go in /public/images */
    gulp.src([
        './public/images/*'
    ])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copyViews', function() {
    gulp.src([
        './views/index.ejs'
    ])
//        .pipe(htmlreplace({
//            'scripts': '/javascripts/paworclaw.js'
//        }))
        .pipe(gulp.dest('dist/views'));
});


// build -- complete build build task
gulp.task('build',
    ['lint', 'css', 'javascripts', 'copyViews']
);
