<?php

namespace App\Utility;

use App\GoogleGeocodingCache;
use App\Utility\Geocoder;
use App\Utility\GeocodingInformation;
use Log;

class GoogleGeocoder extends Geocoder
{
  private $geocodeURL;
  private $radius;
  private $key;
  private $location;
  private $outputType;

  public function __construct($geocodingConfig) {
      $this->geocodeURL = $geocodingConfig['google_geocoding_url'];
      $this->outputType = $geocodingConfig['output'];
      $this->radius = "radius=" . $geocodingConfig['radius'];
      $this->key = "key=" . $geocodingConfig['key'];
      $this->location = "location=" . $geocodingConfig['san_francisco_location']['lat'] . ',' . $geocodingConfig['san_francisco_location']['lon'];
  }

  public function geocode($address) {
      $url = $this->getGeocodingRequestUrl($address);

      $response = $this->getGeocodingResponse($url);

      if ( $response != null ) {
          $latitude = $this->extractLat($response);
          $longitude = $this->extractLon($response);

          if ( $latitude && $longitude ) {
              return new GeocodingInformation($latitude, $longitude);
          }
      }

      return null;
  }

  private function getGeocodingResponse($geocodeURL) {
    $response = json_decode(file_get_contents($geocodeURL), true);

    if($response['status'] == 'OK') {
        return $response;
    }

    return null;
  }

  private function getGeocodingRequestUrl($address)
  {
      $keywordParameter = "keyword=" . urlencode($address);
      return $this->geocodeURL . $this->outputType . '?' . implode("&", [$this->radius, $this->key, $this->location, $keywordParameter]);
  }

  private function extractLat($response) {
      return $response['results'][0]['geometry']['location']['lat'];
  }

  private function extractLon($response) {
      return $response['results'][0]['geometry']['location']['lng'];
  }
}
