<?php

namespace App\Http\Controllers\Resources;

use Illuminate\Http\Request as IlluminateRequest;
use Request;

use App\Http\Response\PaginatedRestData;
use App\Http\Controllers\Controller;
use App\FilmingLocation;
use App\Actor;

class FilmingLocationsController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $locations = FilmingLocation::with('actors')->get();
    $response = new PaginatedRestData();
    return $response->getResponseData();
  }

  /**
  * Display the specified resource.
  *
  * @param  int $id
  * @return \Illuminate\Http\Response
  */
  public function show(FilmingLocation $location)
  {
    return view('filming_locations.show', compact('location'));
  }

  public function searchActor()
  {
    $actor = Actor::select('id', 'actor_name')->where('actor_name', 'LIKE', "%$query%")->findOne();
    $actor->withLocations();

    return response()->json($actor);
  }

  public function search()
  {

  }

  public function autocomplete(IlluminateRequest $request)
  {
    $suggestions = array();

    $query = Request::input('query');

    // Prefix only search
    // We could add similar functionality here for searching by location (i.e. "What movies were shot here?")
    $titles = FilmingLocation::select('id', 'title')->where('title', 'LIKE', "%$query%")->groupBy('title')->get();
    $actors = Actor::select('id', 'actor_name')->where('actor_name', 'LIKE', "%$query%")->get();

    foreach($actors as $actor) {
      $suggestions[] = [
        'type' => 'actor',
        'term' => $actor->actor_name
      ];
    }

    foreach($titles as $title) {
      $suggestions[] = [
        'type' => 'movie',
        'term' => $title->title
      ];
    }

    $suggestions = [
      'suggestions' => $suggestions
    ];

    return response()->json($suggestions);
  }
}
