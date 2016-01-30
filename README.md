# San Francisco filming locations search

This is a simple web app that let's you search for movie filming locations in the San Francisco area.  Search results will auto complete for matching movie titles or filming location names.  After selecting a movie you'll see some information about the movie, as well as pins indicating locations where the movie was shot.  Mousing over a location will display a popover window with more information about that particular location.

The project is currently hosted on an Amazon EC2 instance [here](http://amazon.com).


## Technology used

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
