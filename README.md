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

  * The API will perform a textual search of movies and locations returning whole or partial matches of `query`. Search is to be performed in a case and diacritic insensitive manner. Details of the request/response specification can be seen [here](docs/locations-api-response-schema.md#autocomplete-suggestions).

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

      - `query` - The movie title.

  * The API will perform a textual search of movie titles returning whole matches of `query`. Search is to be performed in a case and diacritic insensitive manner. Details of the request/response specification can be seen [here](docs/locations-api-response-schema.md#locations-search).

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
          },
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

##### Backend

PHP - I chose PHP based on my experience with the language and frameworks.
Laravel - PHP Framework for MVC, database access, event triggers and console commands
Google Places API - For geocoding locations to displayable coordinates.
PHPUnit - Unit testing framework for the backend application.
Gulp.js - Build system for compiling sass and javascript files.

##### Frontend

Google maps API
Backbone.js - Framework for front-end data models and related data views.
underscore.js - Templating language for rendering HTML views on the page.
jQuery - DOM manipulation and events.

See the [architecture diagram](docs/architecture-diagram.png) here for an overview of the platform and core abstractions that are used.


## Installation

You should be able to spin up a local php webserver supporting the needed functionality if you have the following dependencies installed:

- node/npm
  - `brew install node` (osx)
  - `sudo apt-get update && apt-get install nodejs` (ubuntu)
- php5.6+
  - `brew install php56` (osx)
  - `sudo apt-get update && apt-get install php5 php5-mysql` (ubuntu)
- sqlite3
  - `sqlite3 libsqlite3-dev` (ubuntu)
  - `brew install sqlite3` (osx although it should come pre-installed)
- curl
  - `curl`
  - `brew install curl` (osx although it should come pre-installed)

Run:

```
git clone git@github.com:/riguy724/uber-movies-hw
server/setup.sh
```

from the root directory and a local web server should start at [http://localhost:8000](http://localhost:8000).

It will be backed by a local sqlite database with the filming locations and geocode information already present. Be aware that text searches in sqlite are rather slow, so there may be some delay in the retrieval of data from the API.

[Note: This server should never be used outside of local development.]


For detailed setup instructions or to host the application on a server please refer to the [Installation notes](docs/installation.md) section.

### Future enhancements

Improved search functionality for any field, might require using something like lucene as a document store to improve full text search on an entire records, so as not to have to specify every field in a mysql "like" query.

Improved data validation and error schema.  There is some allowance for expections being thrown
Paginated collection browsing, following better restful document access for each location, movie, actor.
Allowing search by related records (actors, movies etc...) would require that the dataset be better organized.
