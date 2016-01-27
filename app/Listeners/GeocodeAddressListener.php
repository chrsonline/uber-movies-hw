<?php

namespace App\Listeners;

use App\Events\GeocodeAddress;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Utility\Geocoder;
use App\Events\NewLocationAdded;
use App\GoogleGeocodingCache;
use Log;

class GeocodeAddressListener
{
    private $geocoder;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Geocoder $geocoder)
    {
        $this->geocoder = $geocoder;
    }

    /**
     * Handle the event.
     *
     * @param  NewLocationAdded  $event
     * @return void
     */
    public function handle(NewLocationAdded $event)
    {
        $filmingLocation = $event->getFilmingLocation();


        $geocodeInformation = $this->geocoder->geocode($filmingLocation->location);

        if($geocodeInformation != null ) {
          $geocodeInfo = [
            'filming_location_id' => $filmingLocation->id,
            'latitude' => $geocodeInformation->getLatitude(),
            'longitude' => $geocodeInformation->getLongitude()
          ];

          $filmingLocation->setRelation(
            'geocodeInformation',
            $filmingLocation->geocodeInformation()->getRelated()->updateOrCreate(['filming_location_id' => $filmingLocation->id], $geocodeInfo)
          );
        }
    }
}
