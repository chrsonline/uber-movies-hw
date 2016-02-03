<?php

namespace App;

use Event;
use Illuminate\Database\Eloquent\Model;
use App\Events\NewLocationAdded;

class FilmingLocation extends Model
{
  public $timestamps = false;

  public function geocodeInformation()
  {
    return $this->hasOne('App\GoogleGeocodingCache');
  }

  protected static function boot() {
    parent::boot();

    static::created(function(FilmingLocation $location) {
      $event = new NewLocationAdded($location);

      Event::fire($event);
    });
  }

}
