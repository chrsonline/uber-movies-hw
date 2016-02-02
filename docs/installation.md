# Server setup instructions

These instructions assume a clean installation of Ubuntu 14.04 server.

### Dependencies
  - `mysql` - Data store
  - `node` - For building .css and .js files for the front-end application
  - `php` - For running the application and unit tests
  -  A web server to service API and client web requests.

### Installing the code base

Install mysql
- `sudo apt-get install mysql `

Install composer
- ` wat `

Install composer packages
- `composer install`

Install node
- ` wat `

Install node packages
- `npm install`

Run build
- `node_modules/.bin/gulp`

### Running unit tests

- `vendor/bin/phpunit`

### Configuration

The Laravel application configuration happens through environment variables.  The application config files are organized under the `config` directory and link in values from the environment in an organized fashion. All local configurations to these values should be overridden in the applications `.env` file located in the root directory.  There is a provided `.env.default` template which should provide you with a good starting point for configuring your environment for the application to run in.

Copy the .default file:
`cp .env.default .env`

and minimally fill out the below keys based on your server's setup.

```
DB_CONNECTION=sqlite
DB_CONNECTION=mysql (default)
APP_KEY=
```

- `php artisan key:generate` - run to generate application key

You'll also need a google places API key to store geocoding information for the locations. You can request one for use [here](https://console.developers.google.com/apis/credentials). Just create a new project and select Google Places API.  Fill this out in your `.env` file as well for use in the application.

`GOOGLE_PLACES_API_KEY=<api key>`

### Application administration

All application administration happens through the use of Laravel's Artisan console component. To see the list of available artisan commands and descriptions of them run `php artisan list`.

For a particular command the `--help` option will display a description of the commands usage and available options.

##### Loading data

- `php artisan migrate:refresh`
- `php artisan locations:geocode`
- `php artisan database:import`

### Web server

While you can use the build in PHP web server for hosting things, it's much better to set up apache or nginx to serve the application. There are many tutorial for configuring web servers out there, so we won't get in to this here, but in general the needed components for a given web server will be `mod_php` and `mod_rewrite` for the application to work.

Just set the directory for servicing requests to the location of `public/` in this repository and you should be all set.
