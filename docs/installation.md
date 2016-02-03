# Server setup instructions

These instructions assume a clean installation of Ubuntu 14.04 server.

### Dependencies
  - `mysql` - Data store
  - `node` - For building .css and .js files for the front-end application
  - `php` - For running the application and unit tests
  -  A web server to service API and client web requests.

### Installing the code base

Be sure to remember your set mysql password and database name
```
sudo apt-get install git-core
git clone git@github.com:/chrsonline/uber-movies-hw.git
sudo apt-get update
sudo apg-get install git-core
sudo apt-get install build-essential php5 php5-mysql php5-sqlite sqlite3 libsqlite3-dev curl mysql-server
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get update && sudo apt-get install nodejs
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
composer install
npm install
```

#### Building javascript and css

In addition you must build the javascript and css files for distribution, this is managed via a [gulp](gulpjs.com) build.  This will build the files needed for the front-end in to their corresponding directories and files in the `public/` directory.

`DISABLE_NOTIFIER=true node_modules/.bin/gulp`

### Running unit tests

To execute backend unit tests run:

`vendor/bin/phpunit`

### Configuration

The Laravel application configuration happens through environment variables.  The application config files are organized under the `config` directory and link in values from the environment in an organized fashion. All local configurations to these values should be overridden in the applications `.env` file located in the root directory.  There is a provided `.env.default` template which should provide you with a good starting point for configuring your environment for the application to run in.

Copy the .default file:
`cp .env.default .env`

Uncomment the lines in the `DB_` section to use mysql as your data store, and fill out the necessary values, your config should look like this when it's completed.  Make sure to leave the `APP_KEY` value blank, as Laravel will generate and update this value for us.  When you're finished your config should look like this:
```
APP_ENV=local
APP_DEBUG=true
APP_KEY=RaYOfYONEr1vmvLPHCESc2wU5pccPFyj

# Specify sqlite as our default database for testing and quick setup.
# DB_CONNECTION=sqlite

# For using mysql uncomment the below configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=sfmovies
DB_USERNAME=root
DB_PASSWORD=password

GOOGLE_PLACES_API_KEY=key

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync
```

Now run `php artisan key:generate` to generate your `APP_KEY` value.

You'll also need a google places API key to store geocoding information for the locations. You can request one for use [here](https://console.developers.google.com/apis/credentials). Just create a new project and select Google Places API.  Fill this out in your `.env` file as well for use in the application.

`GOOGLE_PLACES_API_KEY=<api key>`

### Application administration

All application administration happens through the use of Laravel's Artisan console component. To see the list of available artisan commands and descriptions of them run `php artisan list`.

For a particular command the `--help` option will display a description of the commands usage and available options.

##### Migrations and data loading

To start create a database for your use (use your database name from the configuration file):
`echo 'create database sfmovies' | mysql -uroot -p`

First run the data migrations you need for the database schema:
- `php artisan migrate:refresh`

Then import the data set from SFData:
- `php artisan database:import-locations`

[ Note: This operation is not idempotent, so only run it once! ]


Finally, kick off geocoding for the newly loaded data.  This will normally happen when data is loaded to a running application, but for the initial data load we'll want to load it manually:

- `php artisan locations:geocode`

### Web server

While you can use the build in PHP web server for hosting things, it's much better to set up apache or nginx to serve the application. There are many tutorial for configuring web servers out there, so we won't get in to this here, but in general the needed components for a given web server will be `mod_php` and `mod_rewrite` for the application to work.

You'll also need to give your web server's user read and write access to the `storage/` directory, or just set it to be world writeable:
`chmod -R 777 storage`

Once this is done, just set the directory for servicing requests to the location of `public/` in this repository and you should be all set.


### Verify installation

Navigate to the base URL and you should be able to see the server!
To view server logs for debugging look in `storage/logs/laravel.log`.
