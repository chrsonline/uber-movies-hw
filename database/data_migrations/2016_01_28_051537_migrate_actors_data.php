<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\FilmingLocation;
use App\Actor;

/**
 *  This migration breaks the actors data out of the locations table
 *  and puts it in a separate relational table to:
 *      - ease use of searching by actor
 *      - support better normalization of the 'actors' field across movies.
 */
class MigrateActorsData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actors', function (Blueprint $table) {
          $table->increments('id');
          $table->string('actor_name')->unique();
        });

        Schema::create('actor_filming_location', function (Blueprint $table) {
          $table->increments('id');
          $table->unique(array('actor_id', 'filming_location_id'));
          $table->integer('actor_id')->unsigned();
          $table->foreign('actor_id')
              ->references('id')->on('actors');
          $table->integer('filming_location_id')->unsigned();
          $table->foreign('filming_location_id')
              ->references('id')->on('filming_locations');
        });

        FilmingLocation::chunk(200, function($locations){

          $locations = $locations->map(

            /**
             * Extract the actors from fields actor_1, actor_2 and actor_3 for a given location.
             */

            function ($location) {
              $actors = array();
              foreach(array('actor_1', 'actor_2', 'actor_3') as $field) {
                if(!empty($location->$field)) {
                  $actors[] = array(
                                'filming_location_id' => $location->id,
                                'title' => $location->title,
                                'actor_name' => $location->$field
                              );
                }
              }
              return $actors;
            }

            /**
             * End map function
             */

          );

          // Here we look for existing actors, or create them if they don't exist
          // The filming locations get added to that users list
          $actorData = array();
          foreach($locations as $actors) {
            foreach($actors as $actor) {
              $create = false;
              $newActor = Actor::where('actor_name', '=', $actor['actor_name'])->first();
              if(!$newActor) {
                $create = true;
                $newActor = new Actor();
                $newActor->actor_name = $actor['actor_name'];
                $newActor->save();
              }
              $newActor->filmingLocations()->attach($actor['filming_location_id']);
              $newActor->save();
            }
          }


        });

        Schema::table('filming_locations', function (Blueprint $table) {
          $table->dropColumn(array('actor_1', 'actor_2', 'actor_3'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Cannot undo this migration easily without restoring the database.
        // Ideally you would break up this migration in to schema and data changes individually, but combined here for clarity.
    }
}
