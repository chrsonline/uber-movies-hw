# Install necessary packages
npm install
composer install

# Create Database
echo "create database test" | mysql -u root -p -P 3306 -h localhost
php artisan migrate:refresh --path=database/migrations

# Import local data
mysql -u root -p -P 3306 -h localhost < data-import.sql
php artisan migrate:refresh --path=database/data_migrations

# Make local commands slightly easier to run
export PATH=$PATH:`pwd`/node_modules/.bin:`pwd`/vendor/bin

# Run build, static analysis and unit tests
gulp
vendor/bin/phpunit

# Start the server
php artisan serve --port=8000 --host=local.dev
