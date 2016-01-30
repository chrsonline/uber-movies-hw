<?php

namespace App;

use Event;
use Illuminate\Database\Eloquent\Model;

class FilmingLocation extends Model
{
  public $timestamps = false;

  public function actors()
  {
    return $this->belongsToMany('App\Actor');
  }

  public function geocodeInformation()
  {
    return $this->hasOne('App\GoogleGeocodingCache', 'id', 'google_geocoding_cache_id');
  }

  protected static function boot() {
    parent::boot();

    static::created(function(FilmingLocation $location) {
      $event = new NewLocationAdded($location);

      Event::fire($event);
    });
  }

}
