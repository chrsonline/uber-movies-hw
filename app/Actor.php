<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
  public $timestamps = false;

  public function filmingLocations()
  {
    return $this->belongsToMany('App\FilmingLocation');
  }

  public function geocodeInformation()
  {
    return $this->hasManyThrough('App\GoogleGeocodingCache', 'App\FilmingLocation');
  }
}
