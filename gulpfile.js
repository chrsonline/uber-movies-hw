var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
});

elixir(function(mix) {
  mix.scripts([
      "/backbone/Application.js"
  ]);
});

gulp.task('one', function() {
    console.log('one runs');
    return gulp.src(".").pipe(plugins.notify('now one runs'));
});

gulp.task('two', ['one'], function() {
    console.log('now two runs');
    return true;
});
