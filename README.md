# San Francisco filming locations search

This is a simple web app that let's you search for movie filming locations in the San Francisco area.  Search results will auto complete for matching movie titles or filming location names.  After selecting a movie you'll see some information about the movie, as well as pins indicating locations where the movie was shot.  Mousing over a location will display a popover window with more information about that particular location.

The project is currently hosted on an Amazon EC2 instance [here](http://sfmovies.chrs.online).

### Problem statement

Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

The data is available on [DataSF: Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am).

More information on the problem statement can be seen [here](https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md).

#### Deliverables

* [Use cases](#use-cases)

* [Architecture design diagram](docs/architecture-diagram.png)

* [Hosted Application](http://sfmovies.chrs.online) and [Installation instructions](#installation)

* [Future enhancements](#enhancements)

---

##<a name="use-cases"></a>Use cases this solution addresses

This web appplication addresses the 4 use cases outlined below.

1. **Request suggestions** - User requests suggestions for matching text based on an input query.
  * A request is made to the Film Locations API via a GET request to `search/autocomplete` with the users input as they type.

    * Request/response details available in [**the API Documentation**](docs/locations-api-response-schema.md#autocomplete-suggestions).


  * The API will perform a textual search of movies and locations returning whole or partial matches of `query`. Search is to be performed in a case and diacritic insensitive manner.

  * On a success response from the server, suggestions will autocomplete a drop down list with the related movie title that initiate a search for the movie when selected.

  * If no matching suggestions can be returned, the user will receive an array of empty suggestions and no autocomplete suggestions are displayed.

  * Postconditions:
    - The user has a list of suggested results populated and displayed based on their current input.

2. **Select suggestion** - A user chooses a suggested search term to initiate a search on the selected term.
  * From a set of displayed suggestions, the search term matching a particular movie title is populated in to the search box.

  * Postconditions:
    - The search box is populated with a selected search suggestion and a search initiated.

3. **Request locations** - User submits an API request to search for a movie title
  * From the search box a user submits an API request to retrieve corresponding movie locations for the selected title.

  * A request is made to the Film Locations API via a GET request to `search`. The API will perform a textual search of movie titles returning whole matches of `query`. Search is to be performed in a case and diacritic insensitive manner.

    * Request/response details available in [**the API Documentation**](docs/locations-api-response-schema.md#locations-search).


  * If no movies are found the API will respond with an empty `results` array.

  * Aggregate information about the movie will be displayed in a results box somewhere on the screen.

  * The location results will be displayed on the map, with the ability to view corresponding location names, fun facts, and names of actors who participated in the shoot.

  * Postconditions:
    - Movie details are viewable in an information box and location pins are displayed on the map for the initiating search query.

4. **View location** - User mouses over a display pin on the map and a popup is temporarily displayed with more information.
  * When the cursor is hovered above a displayed location, a popup will appear with more information.

  * When the cursor moves away from hovering, the popup will disappear.

  * Any portions of the data not returned, or returned empty should not have an effect on usability.

  * Postconditions:
    - Location name, facts and actors are displayed in an info window over the corresponding pin on the map.

## Technology used and design decisions

##### Backend

- PHP - I chose PHP based on my experience with the language and frameworks.
- Laravel - PHP Framework for MVC, database access, event triggers and console commands
- Google Places API - For geocoding locations to displayable coordinates.
- PHPUnit - Unit testing framework for the backend application.
- Gulp.js - Build system for compiling sass and javascript files.

##### Frontend

- Backbone.js - Framework for front-end data models and related data views.
- Google maps API - For display of the San Francisco area, markers and information popovers.
- underscore.js - Templating language for rendering HTML views on the page.
- jQuery - For performing DOM manipulations and generating events.

See the [architecture diagram](docs/architecture-diagram.png) for an overview of the platform and core abstractions that are used.


##<a name="installation"></a>Installation

You should be able to spin up a local php webserver supporting the needed functionality if you have the following dependencies installed.

- node.js/npm (must be node version 5+)
- php5.6+
- sqlite3
- curl
- [homebrew](http://brew.sh/) (OSX only)

Use the following prerequisite installation instructions for your operating system:
- OSX setup:
  ```sh
  brew install node php56 sqlite3 curl
  ```

- Ubuntu 14.04 setup:
  ```sh
  sudo apt-get update
  sudo apt-get install -y build-essential php5 php5-sqlite sqlite3 libsqlite3-dev curl
  curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
  sudo apt-get update && apt-get install -y nodejs
  ```

Once dependencies are installed, run the following to start a local web server hosting the application.
  ```sh
  git clone git@github.com:/chrsonline/uber-movies-hw.git
  cd uber-movies-hw
  cp .env.default .env
  bin/install
  php artisan serve
  ```

If the PHP webserver gives you a failed to listen error, it is most likely that you need a corresponding hosts entry.  Simply add a line like this to the bottom of your `/etc/hosts` file:

`127.0.0.1       localhost`

If all went well, the application should be running and locally accessible by navigating to [http://localhost:8000](http://localhost:8000).

This local environment will be backed by a local sqlite database with the filming locations and geocode information already present. Be aware that text searches in sqlite are rather slow, so there may be some delay in the retrieval of data from the API.

[Note: This server should never be used outside of local development.]

For detailed setup instructions or to host the application on a server please refer to the [Installation notes](docs/installation.md) section.

## <a name="enhancements"></a>Future enhancements

* Improved search functionality for any piece of data, might require using something like lucene as a document store to improve full text search on an entire records, so as not to have to specify every field in a mysql "like" query (although that would be completely manageable with an attribute list this small).

* Improved data validation and error schema.  There is some allowance for exceptions being thrown, but if this service were to be consumer or maintained for use as a maintained or publicly accessible API, there would need to be a lot of additional error handling and service specification.

* More unit and functional testing.  There are some tests, but there could be a lot better.  The feature set and scope here is small, so there isn't much need for test coverage, but as an application likes this grows it would become increasingly important to have good insight in to what portions of the application are functioning correctly as code changes.

* Paginated collection browsing, following better restful document access for each location, movie, actor.

* Shareable links for searches based on URL parsing, backbone can do this easily with its router.

* Add utilities for uploading more data or for users to fix invalid or inaccurate data entries.
