<?php

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => ['web']], function () {
    //
});

Route::resource('filming_location', 'FilmingLocationsController',
                ['only' => ['index', 'show']]);

Route::get('filming_location/autocomplete/{query}', 'FilmingLocationsController@autocomplete');
