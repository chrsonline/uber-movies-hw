@extends('app')

@section('content')
    <h2>Filming locations</h2>

    @if ( !$locations->count() )
        There are no locations to display.
    @else
        <ul>
            @foreach( $locations as $location )
                {{ $location->title }} <br />
            @endforeach
        </ul>
    @endif
@endsection
