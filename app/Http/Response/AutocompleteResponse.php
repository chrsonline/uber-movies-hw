<?php

namespace App\Http\Response;

class AutocompleteResponse {
  private $suggestions;

  public function __construct($suggestions) {
      $this->suggestions = $suggestions;
  }

  public function getStructuredResponse() {
      return [
        'suggestions' => $this->suggestions
      ];
  }
}

?>
