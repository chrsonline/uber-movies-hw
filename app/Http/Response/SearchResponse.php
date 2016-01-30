<?php

namespace App\Http\Response;

class SearchResponse {
  private $locations;

  public function __construct($locations) {
      $this->locations = $locations;
  }

  public function getStructuredResponse() {
      return [
        'results' => $this->locations
      ];
  }
}

?>
