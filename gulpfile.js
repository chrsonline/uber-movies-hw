var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.sass('app.scss');
});

elixir(function(mix) {
  mix.scripts([
      "/backbone/Application.js"
  ]);
});
