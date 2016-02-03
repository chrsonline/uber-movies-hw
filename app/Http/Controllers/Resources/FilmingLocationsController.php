<?php

namespace App\Http\Controllers\Resources;

use Illuminate\Http\Request as IlluminateRequest;
use Request;
use Event;

use App\Http\Response\SearchResponse;
use App\Http\Response\AutocompleteResponse;
use App\Http\Controllers\Controller;
use App\FilmingLocation;

class FilmingLocationsController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
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

  public function search()
  {
    $query = Request::input('query');

    $locations = FilmingLocation::with('geocodeInformation')
                    ->where('title', '=', $query)
                    ->get();

    $searchResponse = new SearchResponse($locations);

    return response()->json($searchResponse->getStructuredResponse());
  }

  public function autocomplete(IlluminateRequest $request)
  {
    $suggestions = array();

    $query = Request::input('query');

    // We could add similar functionality here for searching by other fields and result sets (i.e. "What movies were shot here?")
    $titles = FilmingLocation::select('title', 'location')
                ->where('title', 'LIKE', "%$query%")
                ->orWhere('location', 'LIKE', "%$query%")
                ->groupBy('title')
                ->get();

    $autocompleteResponse = new AutocompleteResponse($titles->toArray());

    return response()->json($autocompleteResponse->getStructuredResponse());
  }
}
