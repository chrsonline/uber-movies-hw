<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AutocompleteEndpointTest extends TestCase
{
    /**
     * See that autocomplete endpoint is available and returning data.
     *
     * @return void
     */
    public function testEndpoint()
    {
      $content = $this->get( $this->baseUrl() . '/search/autocomplete');

      $content->assertResponseStatus(200);

      $content->seeJsonStructure(['suggestions']);
    }
}
