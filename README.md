# San Francisco filming locations search

This is a simple web app that let's you search for movie filming locations in the San Francisco area.  Search results will auto complete for matching movie titles or filming location names.  After selecting a movie you'll see some information about the movie, as well as pins indicating locations where the movie was shot.  Mousing over a location will display a popover window with more information about that particular location.

The project is currently hosted on an Amazon EC2 instance [here](http://amazon.com).

## Problem statement

SF Movies

Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

The data is available on DataSF: Film Locations.

More information on the problem statement can be seen [here](https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md).

##### Deliverables

• A	text	description	of	the	use	cases	your	solution	addresses.

• Block	diagram of	the	design.

• Code	for	the	solution,	including	build	&	test	instructions.

• Description	of	future	enhancements	to	make	the	application	more	useful.


## Use cases this solution addresses

1. Request suggestions - User requests suggestions for matching text based on an input query.
  * A request is made to the Film Locations API via a GET request to `search/autocomplete`, providing the following parameter set:

    **Required Parameters**

      - `query` - The text to match in the search

  * The API will perform a textual search of movies and locations returning whole or partial matches of `query`.

  * A response is given to the user of the following format:
    ```json
    {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Suggestions",
  "type": "object",
  "properties": {
    "suggestions": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "location": {
              "type": "string"
            }
          },
          "required": [
            "title",
            "location"
          ]
        }
      ],
      "required": []
    }
  },
  "required": [
    "suggestions"
  ]
}
    ```

 * Suggestions will autocomplete a drop down with the related movie title that initiate a search for the movie when selected.

 * If no matching suggestions can be returned, the user will receive an array of empty suggestions and no autocomplete suggestions are displayed.

2. Select suggestion - A user chooses a suggested search term to initiate a search on the selected term.
  * From a set of displayed suggestions, the search term matching a particular movie title is populated in to the search box.

3. Request locations - User submits an API request to search for a movie title
  * From the search box a user submits an API request to retrieve corresponding movie locations for the selected title.

  * A request is made to the Film Locations API via a GET request to `search`, providing the following parameter set:

    **Required Parameters**

      - `query` - The movie title

  * The API will perform a textual search of movie titles returning whole matches of `query`.

  * A response is given to the user of the following format:
    ```json
    {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Suggestions",
  "type": "object",
  "properties": {
    "results": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "release_year": {
            "type": "string"
          },
          "location": {
            "type": "string"
          },
          "facts": {
            "type": "string"
          },
          "production_company": {
            "type": "string"
          },
          "distributor": {
            "type": "string"
          },
          "director": {
            "type": "string"
          },
          "writer": {
            "type": "string"
          },
          "actor_1": {
            "type": "string"
          },
          "actor_2": {
            "type": "string"
          },
          "actor_3": {
            "type": "string"
          },
          "misc": {
            "type": "string"
          }
          "geocode_information": {
            "type": "object",
            "properties": {
              "latitude": {
                "type": "string"
              },
              "longitude": {
                "type": "string"
              }
            }
          }
        },
        "required": [
          "id",
          "title",
          "release_year",
          "location",
          "facts",
          "production_company",
          "distributor",
          "director",
          "writer",
          "actor_1",
          "actor_2",
          "actor_3",
          "misc",
          "geocode_information"
        ]
      },
      "required": []
    }
  },
  "required": [
    "results"
  ]
}
    ```

  * If no movies are found the API will respond with an empty `results` array.

  * Aggregate information about the movie will be displayed in a results box somewhere on the screen.

  * The location results will be displayed on the map, with the ability to view corresponding location names, fun facts, and names of actors who participated in the shoot.

4. View location - User mouses over a display pin on the map and a popup is temporarily displayed with more information.
  * When the cursor is hovered above a displayed location, a popup will appear with more information.

  * When the cursor moves away from hovering, the popup will disappear.

  * Any portions of the data not returned, or returned empty should not have an effect on usability.

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


See the [architecture diagram](docs/architecture-diagram.png) here for an overview of the platform and core abstractions that are used.


## Installation

You should be able to spin up a local php webserver supporting the needed functionality if you have the following dependencies installed:
- npm
- php5.6
- composer
- sqlite3

Simply run `server/setup.md` and a local web server should start at [http://localhost:8000](http://localhost:8000) with a backing sqlite3 database.

[Note: This server should never be used outside of local development.]

For detailed setup instructions or to host the application on a server please refer to the [Installation notes](docs/installation.md) section.


### Future enhancements
