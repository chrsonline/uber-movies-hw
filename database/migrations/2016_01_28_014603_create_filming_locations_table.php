<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilmingLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('filming_locations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->integer('release_year');
            $table->string('location');
            $table->string('facts', 800);
            $table->string('production_company');
            $table->string('distributor');
            $table->string('director');
            $table->string('writer');
            $table->string('actor_1');
            $table->string('actor_2');
            $table->string('actor_3');
            $table->string('misc');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('filming_locations');
    }
}
