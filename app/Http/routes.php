<?php

Route::group(['middleware' => ['web']], function () {
  Route::get('', function() {
      return view('app');
  });
});

Route::group(['middleware' => ['api']], function () {
  Route::resource('filming_location', 'Resources\FilmingLocationsController',
                  ['only' => ['index', 'show']]);

  Route::get('search/autocomplete', 'Resources\FilmingLocationsController@autocomplete');
  Route::get('search', 'Resources\FilmingLocationsController@search');
});
