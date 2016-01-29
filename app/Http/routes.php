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
  Route::get('search/term', 'Resources\FilmingLocationsController@searchTerm');
});


Route::group([], function() {
  Route::get('actors', function () {
      return App\Actor::paginate();
  });
  Route::get('locations', function () {
      return App\FilmingLocation::paginate(30);
  });
});

/*
Route::get('stuff/things', [function() {
  $url = route('abc');
  $redirect = redirect()->route('Filming Locations.filming_location.index');
  return $redirect;
  return Route::currentRouteName();
}, 'as' => 'abc']);
*/
