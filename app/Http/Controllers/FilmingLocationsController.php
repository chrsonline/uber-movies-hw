<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
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
    $locations = FilmingLocation::all();
    return response()->json($locations);
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

  public function search()
  {
    
  }

  public function autocomplete(Request $request, $query)
  {
    $suggestions = array();

    // Prefix only search
    // We could add similar functionality here for searching by location (i.e. "What movies were shot here?")
    $titles = FilmingLocation::select('id', 'title')->where('title', 'LIKE', "$query%")->groupBy('title')->get();
    $actors = Actor::select('id', 'actor_name')->where('actor_name', 'LIKE', "$query%")->get();

    foreach($actors as $actor) {
      $suggestions[] = $actor->actor_name;
    }

    foreach($titles as $title) {
      $suggestions[] = $title->title;
    }

    return response()->json($suggestions);
  }
}
