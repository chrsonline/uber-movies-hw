<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use App\FilmingLocation;

class NewLocationAdded extends Event
{
    use SerializesModels;

    private $filmingLocation;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(FilmingLocation $location)
    {
        $this->filmingLocation = $location;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }

    public function getFilmingLocation() {
      return $this->filmingLocation;
    }
}
