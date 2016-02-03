<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SearchEndpointTest extends TestCase
{
  /**
   * See that search endpoint is available and returning data.
   *
   * @return void
   */
  public function testEndpoint()
  {
    $content = $this->get( $this->baseUrl() . '/search');

    $content->assertResponseStatus(200);

    $content->seeJsonStructure(['results']);
  }
}
