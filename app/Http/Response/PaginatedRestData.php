<?php

namespace App\Http\Response;

use Illuminate\Http\JsonResponse;

class PaginatedRestData
{
    private $base;
    private $paginator;

    public function setBaseLocation($base) {
      $this->base = $base;
    }

    public function setPaginator(LengthAwarePaginator $paginator) {
      $this->paginator = $paginator;
    }

    public function getResponseData() {
      return response()->json(
        array(
          "links" => $this->getLinks(),
          "data" => [
            "ahmagad"
          ]
        )
      );
    }

    private function getLinks() {
      return array(
        "self" => "/products?page=5&per_page=20",
        "first" => null,
        "previous" => null,
        "next" => null,
        "last" => null
      );
    }
}
