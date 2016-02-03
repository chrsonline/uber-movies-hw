<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        $file = file_get_contents($this->argument('data-file'));
    }
}
