<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Utility\Geocoder;
use App\FilmingLocation;

class ImportLocations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'database:import-locations {data-file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import locations data and kick off geocoding.';

    protected $geocoder;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(Geocoder $geocoder)
    {
        parent::__construct();
        $this->geocoder = $geocoder;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $dataFile = fopen($this->argument('data-file'), "r");

        if($dataFile) {
          $rowCounter = 0;
          while (($rowData = fgetcsv($dataFile, 0, ",")) !== FALSE) {
              if( 0 === $rowCounter) {
                  $headerRecord = $rowData;
              } else {
                $location = new FilmingLocation;
                foreach( $rowData as $key => $value) {
                  $attribute = $headerRecord[$key];
                  $location->$attribute = $value;
                }
                $location->save();
                $this->info("Record for {$location->location} added to database.");
              }
              $rowCounter++;
          }
          fclose($dataFile);
        }
    }
}
