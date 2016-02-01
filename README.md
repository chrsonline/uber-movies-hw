# San Francisco filming locations search

This is a simple web app that let's you search for movie filming locations in the San Francisco area.  Search results will auto complete for matching movie titles or filming location names.  After selecting a movie you'll see some information about the movie, as well as pins indicating locations where the movie was shot.  Mousing over a location will display a popover window with more information about that particular location.

The project is currently hosted on an Amazon EC2 instance [here](http://amazon.com).


## Use cases this solution addresses

1. Request suggestions - User requests suggestions for matching text based on an input query.
  * A request is made to the Film Locations API via a GET request to `search/autocomplete` and the following parameter set:

    **Required Parameters**

      - `query` - The text to match in the search

  * The API will perform a textual search of movies and locations returning whole or partial matches of `query`.

  * A response is given to the user of the following format:
    ```json
    {
      "suggestions" : {
        "type" : "array",
        "items" : {
          "type" : "object",
          "properties" : {
            "title" : {
              "description" : "The title of the movie.",
              "type" : "string"
            },
            "location" : {
              "description" : "A description of the filming location.",
              "type" : "string"
            }
          }
        }
      }
    }
    ```

 * Suggestions will autocomplete with the related movie title when selected

 * If no matching suggestions can be returned, the user will receive an array of empty suggestions.

2. Select suggestion - A user chooses a suggested search term

3. Request locations - User submits an API request to

4. View location - User mouses over a display pin on the map

### Technology used

Backend
Laravel - framework for MVC, database access, event triggers and console commands
Google Places API - geocoding locations to get displayable coordinates
phpunit - for tests

Frontend
Google maps API
Backbone.js - For maintaining front-end data models and related view
underscore.js - For templating
jquery - For various DOM manipulation and page load event structure.
gulp - build system for compiling sass and simplifying (concatenating) javascript


See the [architecture diagram](docs/architecture) here for an overview of the platform and core abstractions that are used.


## Installation

You should be able to spin up a local php webserver supporting the needed functionality if you have the following dependencies installed:
- npm
- php5.6
- composer
- sqlite3

Simply run `server/setup.md` and a local web server should start at [http://localhost:8000](http://localhost:8000) with a backing sqlite3 database.

[Note: This server should never be used outside of local development.]

For detailed setup instructions or to host the application on a server please refer to the [Installation notes](docs/installation.md) section.
