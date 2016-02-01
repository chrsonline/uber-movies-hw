# Install necessary packages
npm install

# Install composer and
curl -sS https://getcomposer.org/installer | php
php composer.phar install

cp .env.default .env

# Create Database -- For mysql database import - preferring sqlite3 for ease of use
# echo "drop database test; create database test;" | mysql -u root -p -P 3306 -h localhost
# php artisan migrate:refresh --path=database/migrations

# Import local data
# mysql -u root -p -P 3306 -h localhost test < server/data-import.sql

# Run javascript and css build, static analysis and unit tests
node_modules/.bin/gulp
vendor/bin/phpunit

# Start the server
php artisan serve --port=8000
