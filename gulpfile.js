var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.sass('app.scss');
});

elixir(function(mix) {
  mix.scripts([ "/backbone/models/*.js"], 'public/js/models.js' )
     .scripts([ "/backbone/collections/*.js"], 'public/js/collections.js' )
     .scripts([ "/backbone/views/*.js"], 'public/js/views.js' )
     .scripts([ "/backbone/Application.js" ], 'public/js/app.js' );
});
