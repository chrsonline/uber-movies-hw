<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoogleGeocodingCache extends Model
{
    protected $table = 'google_geocoding_cache';

    protected $fillable = ['latitude', 'longitude', 'filming_location_id'];
}
