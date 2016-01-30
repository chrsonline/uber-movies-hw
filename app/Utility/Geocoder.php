<?php

namespace App\Utility;

abstract class Geocoder
{
    abstract public function geocode($address);
}
