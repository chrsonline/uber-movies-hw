<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Utility\GoogleGeocoder;
use Config;
use Log;

class GeocodingProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('App\Utility\Geocoder', function ($app) {
            return new GoogleGeocoder(Config::get('geocoding'));
        });
    }
}
