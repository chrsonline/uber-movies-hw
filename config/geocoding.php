<?php

return [

    'google_geocoding_url' => 'https://maps.googleapis.com/maps/api/place/nearbysearch/',
    'san_francisco_location' => [
      'lat' => 37.7833,
      'lon' => -122.4167
    ],
    'key' => env('GOOGLE_PLACES_API_KEY', ''),
    'radius' => 10000,
    'output' => 'json'
];
