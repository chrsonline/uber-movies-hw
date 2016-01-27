<?php

namespace App\Console\Commands;

use Event;
use Log;
use Illuminate\Console\Command;
use App\FilmingLocation;
use App\Events\NewLocationAdded;

class GeocodeLocations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'location:geocode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Geocode locations in the database for which no information exists.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      FilmingLocation::chunk(200, function($locations) {
        foreach($locations as $location) {
          if($location->google_geocoding_cache_id == null) {
            $event = new NewLocationAdded($location);

            Event::fire($event);

          }
        }
      });
    }
}
