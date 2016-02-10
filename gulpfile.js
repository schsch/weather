var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var path = require('path');

gulp.task('vendor-css', function(){
    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor-copy', function(){
    gulp.src('node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', function(){
    gulp.src('js/entry.js')
        .pipe(gulpWebpack(getWebpackConfig(false)))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-min', function(){
    gulp.src('js/entry.js')
        .pipe(gulpWebpack(getWebpackConfig(true)))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
    gulp.watch('js/**/*.js', ['js']);
})

gulp.task('all', ['vendor-copy', 'vendor-css', 'js']);
gulp.task('all-min', ['vendor-copy', 'vendor-css', 'js-min']);

function getWebpackConfig(isOptimize)
{
    var plugins = [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ];

    if (isOptimize) {
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    };

    var config = {
        context: path.join(__dirname, 'js'),
        entry: {
            app: path.join(__dirname, 'js', 'entry.js'),
            vendor: ['jquery', 'knockout']
        },
        output: {
            path: path.join(__dirname, 'dist', 'js'),
            filename: 'bundle.js'
        },

        resolve: {
            modulesDirectories: [path.join(__dirname, 'js'), 'node_modules']
        },
        plugins: plugins
    };
    return config;
}