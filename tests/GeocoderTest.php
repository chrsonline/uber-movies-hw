<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use \Mockery as Mocker;
use App\Listeners\GeocodeAddressListener;

class GeocoderTest extends TestCase
{
  /**
   * Simple test to confirm that system components are interacting as expected.
   *
   * @return void
   */
  public function testGeocoding()
  {
    $geocodingMock = Mocker::mock('App\Utility\Geocoder');
    $geocodingMock->shouldReceive('geocode')->once();

    $locationMock = Mocker::mock('App\FilmingLocation');
    $locationMock->shouldReceive('getAttribute')->andReturn('');

    $eventMock = Mocker::mock('App\Events\NewLocationAdded');
    $eventMock->shouldReceive('getFilmingLocation')->once()->andReturn($locationMock);

    $listener = new GeocodeAddressListener($geocodingMock);
    $listener->handle($eventMock);

    Mocker::close();
  }
}
