<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FilmingLocation extends Model
{
  public $timestamps = false;
  
  public function actors()
  {
    return $this->belongsToMany('App\Actor');
  }
}
